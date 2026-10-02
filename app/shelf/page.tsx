import React from "react";
import { games, type Game } from "../extra/games/shelf";
import { GameShelf, PlayingStack } from "./GameCase";

/*
  Undated games can't go in a year, so they get a row per status, in this
  order after the years. "Played" covers multiplayer and endless games as
  well as ones dropped part-way without calling it, so it isn't "unfinished".
*/
const UNDATED_ROWS = ["Finished, undated", "Played", "Dropped", "Backlog"];

/* Older years are sparse (a game or two each), so they share one row. */
const CUTOFF_YEAR = 2020;
const OLDER = `Before ${CUTOFF_YEAR}`;

/* After the years, in this order. */
const TRAILING_ROWS = [OLDER, ...UNDATED_ROWS];

const undatedRow = (status: string | null) => {
  switch (status) {
    case "Finished":
    case "Completed":
      return "Finished, undated";
    case "Dropped":
      return "Dropped";
    case "Backlog":
      return "Backlog";
    default:
      // "Played", "Almost Finished", anything new
      return "Played";
  }
};

/* In-progress games lie in the stack instead of standing in a year. */
const playing = games.filter((game) => game.isPlaying);

/**
 * The date that puts a game in a year: when you finished it, or else when
 * you played it, so multiplayer and never-finished games still land in
 * their year. A backlog game's `played` doesn't count — it isn't played yet.
 */
const shelfDate = (game: Game) =>
  game.completed ?? (game.status === "Backlog" ? null : game.played);

const groupRows = () => {
  const groups = new Map<string, Game[]>();

  const sorted = games
    .filter((game) => !game.isPlaying)
    .sort((a, b) => (shelfDate(b) ?? "").localeCompare(shelfDate(a) ?? ""));

  for (const game of sorted) {
    const date = shelfDate(game);
    const year = date?.slice(0, 4);
    const key = !year
      ? undatedRow(game.status)
      : Number(year) < CUTOFF_YEAR
        ? OLDER
        : year;
    groups.set(key, [...(groups.get(key) ?? []), game]);
  }

  // Years newest first, then "Before 2020", then the status rows.
  const rank = (key: string) => TRAILING_ROWS.indexOf(key);
  return [...groups.entries()].sort(([a], [b]) => {
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    return b.localeCompare(a);
  });
};

/** "4 games · avg ★ 88" */
const stats = (list: Game[]) => {
  // A backlog rating is a guess (often 0), not a verdict.
  const rated = list
    .filter((game) => game.status !== "Backlog")
    .flatMap((game) => game.rating ?? []);
  const avg = rated.length
    ? Math.round(rated.reduce((sum, r) => sum + r, 0) / rated.length)
    : null;

  return [
    `${list.length} ${list.length === 1 ? "game" : "games"}`,
    avg != null && `avg ★ ${avg}`,
  ]
    .filter(Boolean)
    .join(" · ");
};

const ShelfPage = () => {
  return (
    <div className="shelf flex flex-col gap-20 p-6 pt-24 sm:px-12">
      {groupRows().map(([year, yearGames], i) => (
        <section key={year}>
          <header className="shelf-header">
            <h2 className="shelf-year">{year}</h2>
            <p className="shelf-stats">{stats(yearGames)}</p>
          </header>
          <div className="shelf-body">
            <GameShelf games={yearGames} />
            {i === 0 && playing.length ? <PlayingStack games={playing} /> : null}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ShelfPage;
