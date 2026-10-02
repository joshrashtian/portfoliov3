"use client";

import Link from "next/link";
import { useState } from "react";

export type TVMenuItem = {
  label: string;
  href: string;
  /** Small caption under the channel name. */
  caption?: string;
};

export const DEFAULT_TV_MENU: TVMenuItem[] = [
  { label: "Games", href: "https://2024.joshuarashtian.com/projects/game" },
  { label: "2024 Portfolio", href: "https://2024.joshuarashtian.com" },
  { label: "Shelf", href: "/shelf" },
  { label: "Back", href: "/" },
];

/**
 * The menu that lives on the TV screen. This is real DOM (drei <Html transform>)
 * projected onto the glass, so links, hover and focus all behave normally.
 * Sized in px to match the model's screen in model units — see SCREEN in OldTV.
 */
export default function TVMenu({
  items = DEFAULT_TV_MENU,
  width,
  height,
}: {
  items?: TVMenuItem[];
  width: number;
  height: number;
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{ width, height }}
      className="relative flex flex-col justify-between overflow-hidden rounded-[8%_8%_8%_8%/12%_12%_12%_12%] bg-[#07120b] px-14 py-12 text-[#F26419] select-none"
    >
      {/* phosphor glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242, 100, 25,0.18),transparent_10%)]" />
      {/* scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.35)_0px,rgba(0,0,0,0.35)_2px,transparent_2px,transparent_5px)] opacity-60" />
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.9)]" />

      <header className="relative flex items-baseline justify-between">
        <span className="font-mono text-2xl text-[#F26419]/70">MENU</span>
      </header>

      <nav className="relative flex flex-col gap-3">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group flex items-center gap-6 rounded-md px-5 py-3 transition-colors duration-150 ${
              active === i ? "bg-[#8bff9f]/15" : "bg-transparent"
            }`}
          >
            <span
              className={`font-nippo text-4xl transition-opacity duration-150 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            >
              ▶
            </span>
            <span className="flex flex-col">
              <span className="font-nippo text-4xl tracking-wider text-[#e6ffec] drop-shadow-[0_0_12px_rgba(80,255,140,0.5)]">
                {item.label}
              </span>
            </span>
          </Link>
        ))}
      </nav>

      <footer className="relative flex items-center justify-between font-mono text-xl text-[#8bff9f]/50">
        <span>◀ / ▶ TUNE</span>
        <span className="animate-pulse">● REC</span>
      </footer>
    </div>
  );
}
