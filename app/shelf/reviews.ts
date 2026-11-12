import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { games, type Game } from "../extra/games/shelf";

/**
 * Game reviews, written as notes in the in-repo Obsidian vault. Unlike the
 * game notes (scripts/sync-games.ts), a review's body is the point, so it's
 * read straight from the vault at build time rather than synced to JSON.
 *
 * A note is tied to a shelf game by its `game` property (a title, slug or
 * [[wikilink]]), or else by its file name minus " Review". Notes that match
 * no game are skipped, so the vault can hold drafts and scratch notes; a
 * `game` property that matches nothing is a typo and fails the build.
 * `private: true` hides a review, as it does a game.
 */
const REVIEWS_DIR = path.join(process.cwd(), "app/(obsidian)");

export type Review = {
  game: Game;
  /** `header_img`: wide art behind the title. */
  headerImg: string | null;
  /** `review-date`, as YYYY-MM-DD. */
  reviewed: string | null;
  /** Markdown, frontmatter and Obsidian-only syntax removed. */
  body: string;
  /** The opening paragraph as plain text, for the meta description. */
  excerpt: string;
  minutes: number;
};

/** "[[Persona 3 Reload|P3R]]" → "Persona 3 Reload": the note, not the alias. */
const linkTarget = (value: string) =>
  value.replace(/^\[\[([^\]|]+)(?:\|[^\]]*)?\]\]$/, "$1").trim();

const findGame = (name: string) => {
  const key = name.trim().toLowerCase();
  return games.find(
    (game) => game.slug === key || game.title.toLowerCase() === key,
  );
};

/**
 * Obsidian syntax the page can't use. %% comments %% are hidden in
 * Obsidian's reading view, so they must not reach a public page; [[links]]
 * point into the vault, so they become their text.
 */
const toMarkdown = (body: string) =>
  body
    .replace(/%%[\s\S]*?%%/g, "")
    .replace(/(?<!!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) =>
      (alias ?? target).trim(),
    )
    .trim();

/** The first prose paragraph, skipping headings, callouts, lists and code. */
const excerptOf = (body: string, max = 160) => {
  const paragraph =
    body
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^([#>|`-]|\*\s|\d+\.\s)/.test(block)) ?? "";
  const text = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ");
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
};

/**
 * A frontmatter date as YYYY-MM-DD. YAML turns a bare 2026-11-11 into a UTC
 * Date; anything else ("11 November 2026") stays a string, which Date reads
 * as local midnight, so it's formatted from local parts to keep its day.
 */
const toISODate = (value: unknown) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((n) => String(n).padStart(2, "0"))
    .join("-");
};

const minutesOf = (body: string) =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));

const readReview = async (file: string): Promise<Review | null> => {
  const raw = await readFile(path.join(REVIEWS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.private === true) return null;

  const named = data.game ? linkTarget(String(data.game)) : null;
  const game = findGame(named ?? path.basename(file, ".md").replace(/\s+review$/i, ""));
  if (!game) {
    if (named) {
      throw new Error(
        `${file}: \`game: ${data.game}\` matches no game in app/extra/games/games.json`,
      );
    }
    return null;
  }

  const rawDate = data["review-date"] ?? data.review_date;
  const reviewed = rawDate ? toISODate(rawDate) : null;
  if (rawDate && !reviewed) {
    throw new Error(`${file}: can't read \`review-date: ${rawDate}\` as a date`);
  }

  const body = toMarkdown(content);
  return {
    game,
    headerImg: data.header_img ? String(data.header_img) : null,
    reviewed,
    body,
    excerpt: excerptOf(body),
    minutes: minutesOf(body),
  };
};

/** Every published review, keyed by game slug. Read once per render. */
export const getReviews = cache(async () => {
  const files = (await readdir(REVIEWS_DIR)).filter((f) => f.endsWith(".md"));
  const reviews = new Map<string, Review>();

  for (const review of await Promise.all(files.map(readReview))) {
    if (!review) continue;
    if (reviews.has(review.game.slug)) {
      throw new Error(`Two review notes are for ${review.game.title}`);
    }
    reviews.set(review.game.slug, review);
  }
  return reviews;
});
