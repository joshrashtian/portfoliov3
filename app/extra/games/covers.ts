import type { StaticImageData } from "next/image";
import expedition33 from "../../(assets)/images/vgcovers/20244933-clair-obscur-expedition-33-playstation-5-front-cover.jpg";
// "Black Ops 6.png" is a photo of the whole case; this is the insert alone,
// its blue plastic rim cropped off so it doesn't double the shelf's own.
import blackOps6 from "../../(assets)/images/vgcovers/black-ops-6-cover.jpg";
import mafiaOldCountry from "../../(assets)/images/vgcovers/Mafia_The_Old_Country.jpg";
import p3r from "../../(assets)/images/vgcovers/p3r.jpg";
// p5r.jpg with its PS4 band cut off (top 176px), so it can sit in the PS5
// box under the shelf's own band. The PS5 release uses the same art.
import p5rArt from "../../(assets)/images/vgcovers/p5r-art.jpg";
import spiderMan from "../../(assets)/images/vgcovers/spider man.jpg";
import mario3dWorld from "../../(assets)/images/vgcovers/supermario3dworld.jpg";
import launchboxData from "./launchbox.json";

/** next/image takes this shape for /public files as well as imports. */
type ImageData = Pick<StaticImageData, "src" | "width" | "height">;

export type Cover = {
  src: ImageData;
  /** The platform whose box this art belongs in, so the plastic matches. */
  box?: string;
  /**
   * A full retail scan, platform band and all: the shelf drops its own band.
   * Without it the art is key art and sits under the shelf's band.
   */
  scan?: boolean;
  /** Spine colour, picked from the art so the closed case matches it. */
  spine: string;
};

/** Hand-picked covers. Keyed by game slug; images in app/(assets)/images/vgcovers. */
export const COVERS: Record<string, Cover> = {
  "persona-3-reload": { src: p3r, box: "PS5", scan: true, spine: "#1b8fd6" },
  "persona-5-royal": { src: p5rArt, spine: "#8c1414" },
  "spider-man-2018": {
    src: spiderMan,
    box: "PS4",
    scan: true,
    spine: "#b3121a",
  },
  "super-mario-3d-world-bowsers-fury": {
    src: mario3dWorld,
    box: "Nintendo Switch",
    scan: true,
    spine: "#d8231f",
  },
  "mafia-the-old-country": { src: mafiaOldCountry, spine: "#2b1a12" },
  "expedition-33": { src: expedition33, box: "PS5", scan: true, spine: "#181818" },
  "call-of-duty-black-ops-6": {
    src: blackOps6,
    box: "PS5",
    scan: true,
    spine: "#080808",
  },
};

/** Written by scripts/sync-launchbox.ts; images in public/games/launchbox. */
type LaunchboxEntry = {
  id: number;
  name: string;
  platform: string;
  front?: ImageData & { keyArt: boolean };
  color?: string;
};

export const LAUNCHBOX = launchboxData as Record<string, LaunchboxEntry>;

/** A hand-picked cover wins; otherwise LaunchBox's box front, if any. */
export const coverFor = (slug: string): Cover | undefined => {
  if (COVERS[slug]) return COVERS[slug];

  const lb = LAUNCHBOX[slug];
  if (!lb?.front) return undefined;
  return {
    src: lb.front,
    box: lb.platform,
    scan: !lb.front.keyArt,
    spine: lb.color ?? "#333",
  };
};
