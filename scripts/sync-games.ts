/**
 * Sync games from an Obsidian vault folder into the portfolio as JSON.
 *
 * Obsidian Bases don't store data themselves — a .base file is just a saved
 * view (filters, columns, sort). The real data is the YAML frontmatter on each
 * note, so this script reads the notes directly.
 *
 * Usage:
 *   OBSIDIAN_GAMES_DIR="/path/to/vault/Games" bun run scripts/sync-games.ts
 *   (or set GAMES_DIR below)
 *
 * Output: app/extra/games/games.json
 *
 * Notes with `private: true` in their properties are skipped. An optional
 * `case` property picks which platform's box the shelf shows.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const GAMES_DIR =
  process.env.OBSIDIAN_GAMES_DIR ?? "/Users/joshuarashtian/PATH/TO/VAULT/Games";
const OUT_FILE = path.join(process.cwd(), "app/extra/games/games.json");

export type Game = {
  slug: string;
  title: string;
  platforms: string[];
  series: string[];
  status: string | null;
  isPlaying: boolean; // `is_playing`, or a status like "Currently Playing"
  isRepeat: boolean; // `is_repeat_playthrough`
  genres: string[];
  rating: number | null;
  completed: string | null; // YYYY-MM-DD
  played: string | null; // YYYY-MM-DD, when you played it (no completion needed)
  releaseYear: number | null;
  case?: string | null; // which platform's physical box to show, e.g. "PS4"
  launchboxId?: number | null; // pins the LaunchBox Games DB entry (sync-launchbox.ts)
};

// "[[Red Dead Redemption]]" / "[[Persona|P-series]]" -> "Red Dead Redemption" / "P-series"
function stripLink(value: string): string {
  const m = value.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/);
  return (m ? (m[2] ?? m[1]) : value).trim();
}

function toList(value: unknown): string[] {
  if (value == null || value === "") return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .filter((v) => v != null && v !== "")
    .map((v) => stripLink(String(v)));
}

function toNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toDate(value: unknown): string | null {
  if (value == null || value === "") return null;
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const files = (await readdir(GAMES_DIR)).filter((f) => f.endsWith(".md"));
  const games: Game[] = [];

  for (const file of files) {
    const raw = await readFile(path.join(GAMES_DIR, file), "utf8");
    const { data } = matter(raw); // note body is intentionally NOT exported

    if (data.private === true) continue;
    // Skip notes in the folder that aren't game entries
    if (data.status == null && data.game_rating == null) continue;

    const title = path.basename(file, ".md");
    const status = data.status ? String(data.status).trim() : null;
    games.push({
      slug: slugify(title),
      title,
      platforms: toList(data.platform),
      series: toList(data.series),
      status,
      isPlaying:
        data.is_playing === true || (status != null && /playing/i.test(status)),
      isRepeat: data.is_repeat_playthrough === true,
      genres: toList(data.genre),
      rating: toNumber(data.game_rating),
      completed: toDate(data.completed),
      played: toDate(data.played),
      releaseYear: toNumber(data["release year"] ?? data.release_year),
      case: toList(data.case)[0] ?? null,
      launchboxId: toNumber(data.launchbox_id),
    });
  }

  // Currently playing first, then by rating, then A–Z
  games.sort(
    (a, b) =>
      Number(b.isPlaying) - Number(a.isPlaying) ||
      (b.rating ?? -1) - (a.rating ?? -1) ||
      a.title.localeCompare(b.title)
  );

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(games, null, 2) + "\n");

  // A game you're still playing is allowed to have no rating yet
  const missing = games.filter(
    (g) => (g.rating == null && !g.isPlaying) || g.releaseYear == null
  );
  const playing = games.filter((g) => g.isPlaying);
  console.log(`✓ Wrote ${games.length} games to ${path.relative(process.cwd(), OUT_FILE)}`);
  if (playing.length) {
    console.log(`  ▶ Currently playing: ${playing.map((g) => g.title).join(", ")}`);
  }
  if (missing.length) {
    console.log(`  ⚠ Missing rating or release year: ${missing.map((g) => g.title).join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
