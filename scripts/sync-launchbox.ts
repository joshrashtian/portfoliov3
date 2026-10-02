/**
 * Match games.json against the LaunchBox Games Database and pull each game's
 * box front into the site. Run after sync-games.ts. (Spines are left drawn:
 * LaunchBox's spine scans vary too much in style and coverage.)
 *
 * LaunchBox has no public API; it publishes a daily dump instead
 * (https://gamesdb.launchbox-app.com/Metadata.zip, ~100 MB zipped, ~500 MB
 * of XML). It's cached in .cache/launchbox and refreshed when over a week old.
 * Image files live at https://images.launchbox-app.com/<FileName>.
 *
 * Usage (Node, not Bun: sharp's native module doesn't load under Bun 1.1):
 *   node scripts/sync-launchbox.ts
 *
 * Output:
 *   public/games/launchbox/<slug>-front.jpg
 *   app/extra/games/launchbox.json
 *
 * Matching is by title on the platform whose box the shelf shows. When it
 * picks the wrong entry (or none), add `launchbox_id: <DatabaseID>` to the
 * note — it's the number in the game's gamesdb.launchbox-app.com URL.
 */
import { execFileSync } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import sharp from "sharp";
import type { Game } from "./sync-games";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, ".cache/launchbox");
const ZIP = path.join(CACHE_DIR, "Metadata.zip");
const XML = path.join(CACHE_DIR, "Metadata.xml");
const ZIP_URL = "https://gamesdb.launchbox-app.com/Metadata.zip";
const IMAGE_URL = "https://images.launchbox-app.com/";
const MAX_AGE_DAYS = 7;

const GAMES_JSON = path.join(ROOT, "app/extra/games/games.json");
const OUT_JSON = path.join(ROOT, "app/extra/games/launchbox.json");
const IMAGE_DIR = path.join(ROOT, "public/games/launchbox");
const IMAGE_PUBLIC = "/games/launchbox";

/** Note platform → LaunchBox platform. Order is the shelf's box preference. */
const PLATFORMS: [string, string][] = [
  ["PS5", "Sony Playstation 5"],
  ["PS4", "Sony Playstation 4"],
  ["PS3", "Sony Playstation 3"],
  ["Xbox One", "Microsoft Xbox One"],
  ["Xbox 360", "Microsoft Xbox 360"],
  ["Nintendo Switch 2", "Nintendo Switch 2"],
  ["Nintendo Switch", "Nintendo Switch"],
  ["Wii U", "Nintendo Wii U"],
  ["Wii", "Nintendo Wii"],
  ["Nintendo 3DS", "Nintendo 3DS"],
  ["PC", "Windows"],
  ["Steam Deck", "Windows"],
];
const LB_PLATFORM = new Map(PLATFORMS);
const PREFERENCE = PLATFORMS.map(([name]) => name);

/** Box art from these regions reads right on an English-language shelf. */
const REGION_RANK = ["North America", "United States", "World", "", "Europe", "United Kingdom"];

type Image = { src: string; width: number; height: number };
type Front = Image & {
  /**
   * Store art (Steam's 2:3 library capsule) rather than a box scan: no
   * platform band printed on, so the shelf draws its own above it.
   */
  keyArt: boolean;
};
export type LaunchboxEntry = {
  id: number;
  name: string;
  /** The note platform this art is for; the shelf uses that platform's box. */
  platform: string;
  /** How the match was made, so loose ones can be checked. */
  match: "pinned" | "exact" | "alternate" | "loose";
  front?: Front;
  /** Dominant colour of the front, for the drawn spine and edges. */
  color?: string;
};

// "Marvel's Spider-Man: Miles Morales" → "marvelsspidermanmilesmorales"
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const unescape = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

async function ensureMetadata() {
  const fresh =
    existsSync(XML) &&
    (Date.now() - (await stat(XML)).mtimeMs) / 86_400_000 < MAX_AGE_DAYS;
  if (fresh) return;

  await mkdir(CACHE_DIR, { recursive: true });
  console.log(`↓ ${ZIP_URL}`);
  const res = await fetch(ZIP_URL);
  if (!res.ok) throw new Error(`Metadata.zip: HTTP ${res.status}`);
  await writeFile(ZIP, Buffer.from(await res.arrayBuffer()));

  execFileSync("unzip", ["-o", "-q", ZIP, "Metadata.xml", "-d", CACHE_DIR]);
}

type LbGame = { id: number; name: string; platform: string };
type LbImage = { id: number; file: string; type: string; region: string };

/**
 * One pass over the XML. Every element sits on its own line, so a line
 * scanner is enough; only games on our platforms, and only box fronts, are
 * kept.
 */
async function scan(platforms: Set<string>) {
  const games = new Map<number, LbGame>();
  const alternates = new Map<number, string[]>();
  const images: LbImage[] = [];

  let block: "Game" | "GameAlternateName" | "GameImage" | null = null;
  let fields: Record<string, string> = {};

  const lines = readline.createInterface({
    input: createReadStream(XML, "utf8"),
    crlfDelay: Infinity,
  });

  for await (const raw of lines) {
    const line = raw.trim();
    if (line === "<Game>" || line === "<GameAlternateName>" || line === "<GameImage>") {
      block = line.slice(1, -1) as typeof block;
      fields = {};
      continue;
    }
    if (!block) continue;

    if (line === `</${block}>`) {
      const id = Number(fields.DatabaseID);
      if (block === "Game" && platforms.has(fields.Platform ?? "")) {
        games.set(id, { id, name: unescape(fields.Name ?? ""), platform: fields.Platform });
      } else if (block === "GameAlternateName" && fields.AlternateName) {
        alternates.set(id, [...(alternates.get(id) ?? []), unescape(fields.AlternateName)]);
      } else if (
        block === "GameImage" &&
        fields.Type === "Box - Front"
      ) {
        images.push({ id, file: fields.FileName, type: fields.Type, region: fields.Region ?? "" });
      }
      block = null;
      continue;
    }

    const m = line.match(/^<(\w+)>([^<]*)<\/\1>$/);
    if (m) fields[m[1]] = m[2];
  }

  return { games, alternates, images };
}

/**
 * Exact title, then an alternate name, then a title that contains ours.
 * "Spider Man (2018)" is also tried as "Spider Man" for the first two.
 */
function findMatch(
  title: string,
  platform: string,
  byPlatform: Map<string, LbGame[]>,
  alternates: Map<number, string[]>,
  artCount: (id: number) => number,
): { game: LbGame; match: LaunchboxEntry["match"] } | null {
  const want = norm(title);
  const wants = new Set([want, norm(title.replace(/\s*\([^)]*\)\s*/g, " "))]);
  const pool = byPlatform.get(platform) ?? [];

  const exact = pool.find((g) => wants.has(norm(g.name)));
  if (exact) return { game: exact, match: "exact" };

  const alt = pool.find((g) => alternates.get(g.id)?.some((a) => wants.has(norm(a))));
  if (alt) return { game: alt, match: "alternate" };

  // "Expedition 33" → "Clair Obscur: Expedition 33". Most box art first —
  // the real game has far more than a tool or DLC sharing its name ("The
  // Witcher 3 REDkit") — then shortest, so a base game beats "… Deluxe".
  const loose = pool
    .filter((g) => want.length >= 6 && norm(g.name).includes(want))
    .sort((a, b) => artCount(b.id) - artCount(a.id) || a.name.length - b.name.length)[0];
  return loose ? { game: loose, match: "loose" } : null;
}

const bestImage = (list: LbImage[]) =>
  [...list].sort((a, b) => {
    const ra = REGION_RANK.indexOf(a.region);
    const rb = REGION_RANK.indexOf(b.region);
    return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);
  })[0];

/*
  Saved small: a cover shows ~200px wide, so 2× that is plenty, and the originals (up to ~3000px) would put ~50 MB in the repo.
*/
const MAX = { front: { width: 600 } } as const;

async function download(file: string, out: string, kind: keyof typeof MAX): Promise<Image> {
  const dest = path.join(IMAGE_DIR, out);
  if (!existsSync(dest)) {
    const res = await fetch(IMAGE_URL + file);
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
    await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ ...MAX[kind], withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(dest);
  }
  const meta = await sharp(dest).metadata();
  return { src: `${IMAGE_PUBLIC}/${out}`, width: meta.width ?? 0, height: meta.height ?? 0 };
}

/** Steam capsules are exactly 2:3; a PC DVD box is ~0.71, a Blu-ray ~0.79. */
const isKeyArt = (img: Image) => Math.abs(img.width / img.height - 2 / 3) < 0.01;

/** Dominant colour of the cover's middle: scans often have a white margin
    or band that would otherwise win and wash the spine out. */
async function averageColor(src: string) {
  const file = path.join(ROOT, "public", src);
  const { width = 0, height = 0 } = await sharp(file).metadata();
  const { dominant } = await sharp(file)
    .extract({
      left: Math.round(width * 0.15),
      top: Math.round(height * 0.25),
      width: Math.round(width * 0.7),
      height: Math.round(height * 0.6),
    })
    .stats();
  const hex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`;
}

async function main() {
  const games: Game[] = JSON.parse(await readFile(GAMES_JSON, "utf8"));

  await ensureMetadata();
  console.log("… scanning Metadata.xml");
  const { games: lbGames, alternates, images } = await scan(
    new Set(PLATFORMS.map(([, lb]) => lb)),
  );

  const byPlatform = new Map<string, LbGame[]>();
  for (const g of lbGames.values()) {
    byPlatform.set(g.platform, [...(byPlatform.get(g.platform) ?? []), g]);
  }
  const imagesById = new Map<number, LbImage[]>();
  for (const img of images) {
    if (!lbGames.has(img.id)) continue;
    imagesById.set(img.id, [...(imagesById.get(img.id) ?? []), img]);
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  const out: Record<string, LaunchboxEntry> = {};
  const unmatched: string[] = [];
  const loose: string[] = [];

  for (const game of games) {
    // Same order the shelf picks a box in: consoles in the note's order,
    // then PC. An explicit `case` is the only candidate — another platform's
    // scan would have the wrong band printed on it.
    const candidates =
      game.case && LB_PLATFORM.has(game.case)
        ? [game.case]
        : game.platforms
            .filter((p) => LB_PLATFORM.has(p))
            .sort((a, b) => Number(a === "PC" || a === "Steam Deck") - Number(b === "PC" || b === "Steam Deck"));

    let found: { game: LbGame; match: LaunchboxEntry["match"]; platform: string } | null = null;

    if (game.launchboxId != null) {
      const pinned = lbGames.get(game.launchboxId);
      if (pinned) {
        const platform =
          PLATFORMS.find(([, lb]) => lb === pinned.platform)?.[0] ?? candidates[0] ?? "PC";
        found = { game: pinned, match: "pinned", platform };
      }
    }

    for (const platform of found ? [] : candidates) {
      const hit = findMatch(
        game.title,
        LB_PLATFORM.get(platform)!,
        byPlatform,
        alternates,
        (id) => imagesById.get(id)?.length ?? 0,
      );
      // Prefer a platform that actually has box art over an earlier bare one.
      if (hit && (imagesById.get(hit.game.id)?.length ?? 0) > 0) {
        found = { ...hit, platform };
        break;
      }
      found ??= hit && { ...hit, platform };
    }

    if (!found) {
      unmatched.push(game.title);
      continue;
    }

    const imgs = imagesById.get(found.game.id) ?? [];
    const front = bestImage(imgs.filter((i) => i.type === "Box - Front"));
    const entry: LaunchboxEntry = {
      id: found.game.id,
      name: found.game.name,
      // A Steam Deck copy sits in the PC box.
      platform: found.platform === "Steam Deck" ? "PC" : found.platform,
      match: found.match,
    };
    if (front) {
      const img = await download(front.file, `${game.slug}-front.jpg`, "front");
      entry.front = { ...img, keyArt: isKeyArt(img) };
    }
    if (entry.front) entry.color = await averageColor(entry.front.src);

    out[game.slug] = entry;
    if (found.match === "loose") loose.push(`${game.title} → ${found.game.name} (${found.game.id})`);
  }

  await writeFile(OUT_JSON, JSON.stringify(out, null, 2) + "\n");

  const entries = Object.values(out);
  console.log(
    `✓ Matched ${entries.length}/${games.length} · ${entries.filter((e) => e.front).length} fronts`,
  );
  if (loose.length) console.log(`  ? Loose title matches — check these:\n    ${loose.join("\n    ")}`);
  if (unmatched.length) console.log(`  ✗ No match (add launchbox_id): ${unmatched.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
