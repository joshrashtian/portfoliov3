"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { CLOSE_SOUND, SELECT_SOUND, useSound } from "./useSound";

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
  { kind: "section", id: "contact", label: "Contact" },
  { kind: "route", href: "/blog", label: "Blog", sound: true },
  { kind: "route", href: "/extra", label: "Bonus Features" },
];

const buttonClass =
  "relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col border-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-2";

const Navigation = () => {
  const nav = useRouter();
  const pathname = usePathname();
  const playBlip = useSound(SELECT_SOUND);
  const playClose = useSound(CLOSE_SOUND);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleNav = useCallback(
    (item: NavItem) => {
      setMenuOpen(false);
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
    <nav className="fixed top-0 inset-x-0 z-50 font-nippo font-bold">
      {/* Desktop */}
      <div className="hidden md:flex w-3/4 h-16 mx-auto justify-center gap-3 flex-row">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            className={buttonClass}
            onClick={() => handleNav(item)}
          >
            {item.label}
            <motion.div className="w-0 group-active:bg-orange-500 group-hover:w-full duration-300 h-0.5 bg-zinc-400" />
          </motion.button>
        ))}
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
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className="text-left text-lg px-3 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:text-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
