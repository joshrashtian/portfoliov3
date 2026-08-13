"use client";
import React, { useState } from "react";
import Globe from "./globe";
import LAACImage from "../../(assets)/images/LAAC.jpg";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Data (single source of truth)
// ---------------------------------------------------------------------------

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Java", "C", "C++"];
const FRAMEWORKS = ["React", "Next.js", "Node.js", "Express", "TailwindCSS"];
const TOOLS = ["Firebase", "Supabase", "PostgreSQL", "Unity"];

// Bio facts, one place to edit. Update HOME if/when your "base" location
// changes — everything below, including the globe, reads from this.
const HOME = {
  city: "San Luis Obispo, CA",
  coordinates: [35.28, -120.66] as const,
  yearsOfExperience: 3,
};

type CodeToken = { text: string; className?: string };
type Snippet = { lines: CodeToken[][] };

// Each language "writes" the same three facts about you in its own syntax.
// Add a language by adding one entry here — no JSX duplication required.
const SNIPPETS: Record<string, Snippet> = {
  "C++": {
    lines: [
      [
        { text: "int ", className: "text-blue-500" },
        { text: "years_of_experience = " },
        { text: `${HOME.yearsOfExperience}`, className: "text-orange-500" },
        { text: ";" },
      ],
      [
        { text: "int[] ", className: "text-blue-500" },
        { text: "location_coordinates = " },
        { text: `{${HOME.coordinates.join(", ")}};` },
      ],
      [
        { text: "string ", className: "text-blue-500" },
        { text: "location = " },
        { text: `"${HOME.city}"`, className: "text-green-700" },
        { text: ";" },
      ],
    ],
  },
  Java: {
    lines: [
      [
        { text: "public class ", className: "text-orange-500" },
        { text: "Details ", className: "text-teal-700" },
        { text: "extends AboutMe {", className: "text-orange-500" },
      ],
      [
        { text: "  private int ", className: "text-blue-500" },
        { text: "years_of_experience = " },
        { text: `${HOME.yearsOfExperience}`, className: "text-orange-500" },
        { text: ";" },
      ],
      [
        { text: "  private int[] ", className: "text-blue-500" },
        { text: "location_coordinates = " },
        { text: `[${HOME.coordinates.join(", ")}];` },
      ],
      [
        { text: "  private String ", className: "text-blue-500" },
        { text: "location = " },
        { text: `"${HOME.city}"`, className: "text-green-700" },
        { text: ";" },
      ],
      [{ text: "}", className: "text-orange-500" }],
    ],
  },
  TypeScript: {
    lines: [
      [
        { text: "export const ", className: "text-blue-500" },
        { text: "Details ", className: "text-teal-700" },
        { text: "= {", className: "text-orange-500" },
      ],
      [
        { text: "  years_of_experience: " },
        { text: `${HOME.yearsOfExperience},`, className: "text-orange-500" },
      ],
      [
        { text: "  location_coordinates: " },
        { text: `[${HOME.coordinates.join(", ")}],`, className: "text-orange-500" },
      ],
      [
        { text: "  location: " },
        { text: `"${HOME.city}",`, className: "text-green-700" },
      ],
      [{ text: "}", className: "text-orange-500" }],
    ],
  },
};

const LANGUAGE_ORDER = ["C++", "Java", "TypeScript"];

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-zinc-400 dark:text-zinc-500">{children}</p>
  );
}

function ProfileHero() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div className="relative min-h-64 w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 sm:min-h-72 lg:min-h-80">
        <Image
          src={LAACImage}
          alt="Joshua Rashtian speaking at an event"
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-climate-crisis wrap-break-word text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          Joshua Rashtian
        </h1>
        <p className="mt-4 max-w-md wrap-break-word text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Computer Science student at Cal Poly, San Luis Obispo. Full stack
          engineer with {HOME.yearsOfExperience} years of experience building
          web and native apps.
        </p>
      </div>
    </div>
  );
}

function LanguageShowcase() {
  const [selected, setSelected] = useState<string>("C++");
  const snippet = SNIPPETS[selected];

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      <SectionLabel>Written in</SectionLabel>
      <div className="mb-5 mt-4 flex flex-wrap items-center gap-3">
        {LANGUAGE_ORDER.map((language) => (
          <button
            key={language}
            type="button"
            onClick={() => setSelected(language)}
            className={
              selected === language
                ? "rounded-full bg-black px-3 py-1 text-sm font-medium text-white dark:bg-white dark:text-black"
                : "px-1 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
            }
          >
            {language}
          </button>
        ))}
      </div>

      <div className="max-w-full space-y-1 overflow-x-auto font-mono text-xs sm:space-y-2 sm:text-sm lg:text-base">
        {snippet.lines.map((line, i) => (
          <pre key={i} className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
            {line.map((token, j) => (
              <span key={j} className={token.className}>
                {token.text}
              </span>
            ))}
          </pre>
        ))}
      </div>
    </div>
  );
}

function LocationCard() {
  return (
    <div className="p-5 sm:p-6 lg:p-8">
      <SectionLabel>Based in</SectionLabel>
      <div className="mt-4 flex flex-col items-center gap-4">
        <Globe coordinates={HOME.coordinates} />
        <p className="text-base font-bold sm:text-lg">{HOME.city}</p>
      </div>
    </div>
  );
}

function SkillRow({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <p className="w-24 shrink-0 text-sm text-zinc-400 dark:text-zinc-500">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((name) => (
          <span
            key={name}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsetGrid() {
  return (
    <div>
      <SectionLabel>Skillset</SectionLabel>
      <div className="mt-4 flex flex-col gap-3 sm:gap-4">
        <SkillRow title="Languages" items={LANGUAGES} />
        <SkillRow title="Frameworks" items={FRAMEWORKS} />
        <SkillRow title="Tools" items={TOOLS} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const About = () => {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-3xl bg-stone-50 p-6 shadow-sm sm:p-10 lg:p-14 dark:bg-zinc-950">
      <div className="mb-6 sm:mb-8">
        <SectionLabel>About</SectionLabel>
        <div className="mt-3 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="mb-6 sm:mb-8">
        <ProfileHero />
      </div>

      <div className="mb-6 grid grid-cols-1 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800 sm:mb-8 lg:grid-cols-[1.4fr_1fr] lg:divide-x lg:divide-y-0">
        <LanguageShowcase />
        <LocationCard />
      </div>

      <SkillsetGrid />
    </div>
  );
};

export default About;
