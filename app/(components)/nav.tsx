"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { CLOSE_SOUND, SELECT_SOUND, useSound } from "./useSound";
import { ColorSchema } from "../color";

/**
 * The nav lives in the root layout, so it can't hold the homepage's section
 * refs. On "/" it fires this event for the page to handle; anywhere else it
 * routes to "/#section" and the homepage picks the hash up on load.
 */
export const NAV_EVENT = "portfolio:nav";

type NavItem =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; href: string; label: string; sound?: boolean };

const navItems: NavItem[] = [
  { kind: "section", id: "home", label: "Home" },
  { kind: "section", id: "about", label: "About" },
  { kind: "section", id: "experience", label: "Experience" },
  { kind: "section", id: "blog", label: "Blog" },
  { kind: "route", href: "/extra", label: "Bonus Features" },
];

const buttonClass =
  "relative isolate rounded-full px-4 py-2 text-[15px] font-semibold tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7a1620]/50 dark:focus-visible:ring-[#c23b4a]/50";

const Navigation = () => {
  const nav = useRouter();
  const pathname = usePathname();
  const playBlip = useSound(SELECT_SOUND);
  const playClose = useSound(CLOSE_SOUND);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // The item just clicked. The pill jumps straight to it and stays put while
  // the route loads or the page smooth-scrolls past other sections, instead
  // of trailing behind reality and hopping through everything in between.
  const [pinned, setPinned] = useState<string | null>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Scroll-spy: the last homepage section whose top has passed the middle of
  // the viewport is the selected one. Sections are looked up on every scroll
  // since the page can mount after the nav.
  useEffect(() => {
    if (pathname !== "/") {
      // Forget the old section so coming back doesn't flash it first.
      setActiveSection("home");
      return;
    }
    const onScroll = () => {
      let current: string | undefined;
      document
        .querySelectorAll<HTMLElement>("[data-nav-section]")
        .forEach((el) => {
          if (el.getBoundingClientRect().top <= window.innerHeight / 2) {
            current = el.dataset.navSection;
          }
        });
      if (current) setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isCurrent = useCallback(
    (item: NavItem) => {
      if (item.kind === "route") return pathname.startsWith(item.href);
      if (item.id === "blog" && pathname.startsWith("/blog")) return true;
      return pathname === "/" && activeSection === item.id;
    },
    [pathname, activeSection],
  );

  const isActive = (item: NavItem) =>
    pinned ? pinned === item.label : isCurrent(item);

  // Unpin once the page has caught up with the click, or as soon as the
  // visitor takes over scrolling themselves.
  useEffect(() => {
    if (!pinned) return;
    const target = navItems.find((item) => item.label === pinned);
    if (!target || isCurrent(target)) {
      setPinned(null);
      return;
    }
    const release = () => setPinned(null);
    const timeout = window.setTimeout(release, 2500);
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, release, { passive: true }));
    return () => {
      window.clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, release));
    };
  }, [pinned, isCurrent]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleNav = useCallback(
    (item: NavItem) => {
      setMenuOpen(false);
      setPinned(item.label);
      if (item.kind === "route") {
        if (item.sound) playBlip();
        nav.push(item.href);
        return;
      }
      playBlip();
      if (pathname === "/") {
        window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: item.id }));
      } else {
        nav.push(`/#${item.id}`);
      }
    },
    [nav, pathname, playBlip],
  );

  const toggleMenu = () => {
    if (menuOpen) playClose();
    else playBlip();
    setMenuOpen((open) => !open);
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50  font-mono">

      <div className="hidden md:flex justify-center px-6">
        <div className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur-2xl dark:bg-zinc-900/70 dark:ring-white/10">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.label}
                className={`${buttonClass} ${
                  active
                    ? "text-white"
                    : "text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => handleNav(item)}
              >
                {active && (
                  <motion.span
                    layoutId="nav-selected"
                    className={`absolute inset-0 -z-10 rounded-full ${ColorSchema.dark_maroon} shadow-md shadow-[#7a1620]/30 dark:bg-[#c23b4a] dark:shadow-[#c23b4a]/20`}
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-end p-4 pointer-events-none">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={toggleMenu}
          className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full text-2xl text-zinc-700 dark:text-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          {menuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 -z-10 bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <motion.div
              key="panel"
              id="mobile-nav"
              className="md:hidden mx-4 flex flex-col gap-1 p-3 rounded-2xl bg-white/60 backdrop-blur-2xl dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <p className="text-lg font-climate-crisis text-zinc-700 dark:text-zinc-300">
                Where would you like to go?
              </p>
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <button
                    key={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={() => handleNav(item)}
                    className={`flex items-center justify-between text-left text-lg px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7a1620]/50 ${
                      active
                        ? "bg-[#7a1620]/10 text-[#7a1620] dark:bg-[#c23b4a]/15 dark:text-[#c23b4a]"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {item.label}
                    {active && <span className="w-2 h-2 rounded-full bg-[#7a1620] dark:bg-[#c23b4a]" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
