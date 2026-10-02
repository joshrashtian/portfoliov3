import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { IoRepeat, IoStar } from "react-icons/io5";
import {
  SiNintendo3Ds,
  SiNintendoswitch,
  SiPlaystation,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiWii,
  SiWiiu,
} from "react-icons/si";
import { coverFor, type Cover } from "../extra/games/covers";
import type { Game } from "../extra/games/shelf";
import { XboxLogo } from "./XboxLogo";
import "./shelf.css";

type Box = {
  key: string;
  cover: string;
  spine: string;
  logo?: IconType;
  spineLogo?: "along" | "upright";
  logoWithText?: boolean;
  /** A symbol printed before the logo on the cover band (the PS shapes). */
  mark?: IconType;
};

/**
 * The retail box for each platform. Size, plastic and band colours live in
 * shelf.css under [data-case]; this only maps names, labels and logos.
 * PC and Steam Deck have no box of their own, so they fall back to "pc".
 */
const CASES: Record<string, Box> = {
  PS5: {
    key: "ps5",
    cover: "PS5",
    spine: "PS5",
    logo: SiPlaystation5,
    spineLogo: "along",
    mark: SiPlaystation,
  },
  PS4: {
    key: "ps4",
    cover: "PS4",
    spine: "PS4",
    logo: SiPlaystation4,
    spineLogo: "along",
    mark: SiPlaystation,
  },
  PS3: {
    key: "ps3",
    cover: "PS3",
    spine: "PS3",
    logo: SiPlaystation3,
    spineLogo: "along",
  },
  "Xbox One": {
    key: "xbox-one",
    cover: "XBOX ONE",
    spine: "XBOX ONE",
    logo: XboxLogo,
    spineLogo: "upright",
    logoWithText: true,
  },
  "Xbox 360": {
    key: "xbox-360",
    cover: "XBOX 360",
    spine: "XBOX 360",
    logo: XboxLogo,
    spineLogo: "upright",
    logoWithText: true,
  },
  "Nintendo Switch 2": {
    key: "switch-2",
    cover: "NINTENDO SWITCH 2",
    spine: "SWITCH 2",
  },
  "Nintendo Switch": {
    key: "switch",
    cover: "NINTENDO SWITCH",
    spine: "SWITCH",
    logo: SiNintendoswitch,
    spineLogo: "upright",
    logoWithText: true,
  },
  "Wii U": { key: "wii-u", cover: "Wii U", spine: "Wii U", logo: SiWiiu },
  Wii: { key: "wii", cover: "Wii", spine: "Wii", logo: SiWii },
  "Nintendo 3DS": {
    key: "3ds",
    cover: "NINTENDO 3DS",
    spine: "3DS",
    logo: SiNintendo3Ds,
    logoWithText: true,
  },
  PC: { key: "pc", cover: "PC DVD-ROM", spine: "PC" },
};

const CoverBand = ({ box }: { box: Box }) => {
  const Logo = box.logo;
  const Mark = box.mark;
  return (
    <span
      className="cover-band"
      data-logo={Logo ? (box.logoWithText ? "icon" : "wordmark") : undefined}
    >
      {Mark ? <Mark className="band-mark" /> : null}
      {Logo ? <Logo preserveAspectRatio="xMidYMid slice" /> : null}
      {!Logo || box.logoWithText ? <span>{box.cover}</span> : null}
    </span>
  );
};

const SpineBand = ({ box }: { box: Box }) => {
  const Logo = box.spineLogo && box.logo;
  return (
    <span className="spine-band">
      {Logo ? (
        <span className="spine-logo" data-orient={box.spineLogo}>
          <Logo preserveAspectRatio="xMidYMid slice" />
        </span>
      ) : (
        <span className="spine-band-text">{box.spine}</span>
      )}
    </span>
  );
};

/**
 * An explicit `case` wins, then the edition a cover scan shows, then the
 * first console in the note's own order.
 */
const caseFor = (game: Game, cover?: Cover) =>
  CASES[game.case ?? ""] ??
  CASES[cover?.box ?? ""] ??
  game.platforms.map((p) => CASES[p]).find((c) => c && c.key !== "pc") ??
  CASES.PC;

/**
 * Dark or light text for a spine colour. Covers sampled from art can be
 * near-white (The Last of Us, Risk of Rain 2), where the default light text
 * vanishes. 0.18 is where black and white text have equal contrast.
 */
const inkFor = (color: string) => {
  const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
  if (!hex) return "#f5f3ee"; // the hashed hsl() fallback is always dark
  const [r, g, b] = hex.slice(1).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.18 ? "#161616" : "#f5f3ee";
};

/** Stable art colour per game, so the shelf doesn't reshuffle on reload. */
const artColor = (slug: string) => {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `hsl(${hash % 360} 40% 32%)`;
};

/**
 * Everything one case is drawn from, worked out once so the shelf, the
 * detail line, the sort and the stack agree.
 */
const artFor = (game: Game) => {
  const found = coverFor(game.slug);
  const box = caseFor(game, found);
  // A scan has its platform's band printed on: in another platform's box
  // (a `case` override) it would contradict the plastic, so draw instead.
  const cover =
    found?.scan && found.box && CASES[found.box]?.key !== box.key
      ? undefined
      : found;
  const color = cover?.spine ?? artColor(game.slug);
  return { cover, box, color, ink: inkFor(color) };
};

const STYLE = (art: { color: string; ink: string }) =>
  ({ "--art": art.color, "--art-text": art.ink }) as CSSProperties;

/* Shelf order follows CASES: PlayStation, Xbox, Nintendo, then PC. */
const PLATFORM_ORDER = Object.values(CASES).map((box) => box.key);

/** Groups a row by platform. Sort is stable, so each group keeps the
    order it came in (newest finished first). */
const byPlatform = (list: Game[]) =>
  [...list].sort(
    (a, b) =>
      PLATFORM_ORDER.indexOf(artFor(a).box.key) -
      PLATFORM_ORDER.indexOf(artFor(b).box.key),
  );

/*
  Not positioned, so the lighting pseudo-elements still paint over it.
  Eager, not lazy: Chrome's lazy-load visibility check doesn't see through
  the case's 3D transform and clipped cover face, so covers that weren't on
  screen at first paint never loaded — not even once opened. Low priority
  keeps ~55 small covers from competing with the rest of the page.
  Sized for a ~135mm cover at the 420px shelf (~256px).
*/
const CoverImage = ({ cover }: { cover: Cover }) => (
  <Image
    src={cover.src}
    alt=""
    sizes="260px"
    loading="eager"
    fetchPriority="low"
    className="cover-img"
  />
);

/**
 * One game case: a four-faced 3D box that rests spine-out and turns to face
 * you when opened. <details name="shelf"> holds the state, so there is zero JS
 * and only one case is open at a time.
 */
export const GameCase = ({ game }: { game: Game }) => {
  const art = artFor(game);
  const { cover, box } = art;

  const described = [
    game.status && `status ${game.status}`,
    game.rating != null && `rated ${game.rating}`,
    game.completed && `completed ${game.completed}`,
    game.isRepeat && "repeat playthrough",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="game-case" data-case={box.key} style={STYLE(art)}>
      <details name="shelf">
        <summary aria-label={game.title}>
          <span className="case-inner" aria-hidden="true">
            <span className="face-back" />
            <span className="face-fore" />
            <span className="face-spine">
              <SpineBand box={box} />
              {game.isRepeat ? (
                <span className="spine-repeat">
                  <IoRepeat />
                </span>
              ) : null}
              <span className="spine-title">{game.title}</span>
            </span>
            <span className="face-cover">
              {/* A retail scan carries its own band; key art sits under ours. */}
              {cover?.scan ? null : <CoverBand box={box} />}
              <span className="cover-art">
                {cover ? (
                  <CoverImage cover={cover} />
                ) : (
                  <span className="cover-title">{game.title}</span>
                )}
              </span>
            </span>
          </span>
        </summary>
        <p className="sr-only">{described}</p>
      </details>
    </li>
  );
};

const platformName = (game: Game) => {
  const { box } = artFor(game);
  return box.key === "pc" ? "PC" : box.cover;
};

/** "17 Feb": the year is already the row's heading. */
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

/*
  Shows the open case's line: slot i's <details> open → detail i visible.
  Positional, so it holds for any row; repeated rules across rows are inert.
*/
const detailRules = (count: number) =>
  Array.from(
    { length: count },
    (_, i) =>
      `.shelf-row:has(> .game-shelf > :nth-child(${i + 1}) details[open]) > .shelf-details > :nth-child(${i + 1}){display:flex}`,
  ).join("\n");

export const GameShelf = ({ games }: { games: Game[] }) => {
  const list = byPlatform(games);
  return (
    <div className="shelf-row">
      <style>{detailRules(list.length)}</style>
      <ul className="game-shelf">
        {list.map((game) => (
          <GameCase key={game.slug} game={game} />
        ))}
      </ul>
      {/* Visual twin of each case's sr-only payload, so hidden from AT. */}
      <div className="shelf-details" aria-hidden="true">
        {list.map((game) => (
          <p key={game.slug} className="shelf-detail">
            <span className="detail-title">{game.title}</span>
            <span className="detail-meta flex flex-row gap-4">
              {platformName(game)}
              <span
                className={`${game.rating >= 95 ? "text-yellow-600" : game.rating >= 90 ? "text-orange-500" : ""} flex flex-row gap-1 items-center`}
              >
                <IoStar />
                {game?.rating}
              </span>
              {game.status}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

const LyingBand = ({ box }: { box: Box }) => {
  const Logo = box.logo;
  return (
    <span
      className="lying-band"
      data-logo={Logo ? (box.logoWithText ? "icon" : "wordmark") : undefined}
    >
      {Logo ? (
        <Logo preserveAspectRatio="xMidYMid slice" />
      ) : (
        <span>{box.spine}</span>
      )}
    </span>
  );
};

/** In-progress games, lying flat at the end of the newest row. */
export const PlayingStack = ({ games: list }: { games: Game[] }) => (
  <section className="playing" aria-label="Currently playing">
    <p className="playing-label" aria-hidden="true">
      Currently playing
    </p>
    <ul className="playing-stack">
      {byPlatform(list).map((game) => {
        const art = artFor(game);
        const { box } = art;
        return (
          <li
            key={game.slug}
            className="lying-case"
            data-case={box.key}
            style={STYLE(art)}
          >
            <LyingBand box={box} />
            <span className="lying-title">{game.title}</span>
          </li>
        );
      })}
    </ul>
  </section>
);
