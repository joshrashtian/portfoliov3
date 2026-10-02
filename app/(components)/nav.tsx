"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  IoHomeOutline,
  IoPersonOutline,
  IoMailOutline,
  IoRocketOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const BLIP_URL = "/Blip4.wav";

/**
 * The nav lives in the root layout, so it can't hold the homepage's section
 * refs. On "/" it fires this event for the page to handle; anywhere else it
 * routes to "/#section" and the homepage picks the hash up on load.
 */
export const NAV_EVENT = "portfolio:nav";

const navItems = [
  { id: "home", label: "Home", icon: <IoHomeOutline /> },
  { id: "about", label: "About", icon: <IoPersonOutline /> },
  { id: "experience", label: "Experience", icon: <IoRocketOutline /> },
  { id: "contact", label: "Contact", icon: <IoMailOutline /> },
];

const Navigation = () => {
  const blipRef = useRef<HTMLAudioElement | null>(null);

  const nav = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    blipRef.current = new Audio(BLIP_URL);
    blipRef.current.preload = "auto";
    return () => {
      blipRef.current?.pause();
      blipRef.current = null;
    };
  }, []);

  const playBlip = useCallback(() => {
    const audio = blipRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);

  const handleNav = useCallback(
    (id: string) => {
      playBlip();
      if (pathname === "/") {
        window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: id }));
      } else {
        nav.push(`/#${id}`);
      }
    },
    [nav, pathname, playBlip],
  );

  return (
    <nav className=" w-3/4  h-16 font-nippo font-bold justify-center gap-3 flex flex-row fixed top-0 inset-x-0 mx-auto">
      {navItems.map(({ id, label, icon }) => (
        <motion.button
          key={id}
          className="relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col border-zinc-200  dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
          onClick={() => handleNav(id)}
        >
          {label}
          <motion.div className="w-0 group-active:bg-orange-500 group-hover:w-full duration-300 h-0.5 bg-zinc-400" />
        </motion.button>
      ))}
      <motion.button
        className="relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col   border-zinc-200  dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
        onClick={() => {
          playBlip();
          nav.push("/blog");
        }}
      >
        <span className="">Blog</span>
        <motion.div className="w-0 group-active:bg-orange-500 group-hover:w-full duration-300 h-0.5 bg-zinc-400" />
      </motion.button>
      <motion.button
        className="relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col   border-zinc-200   dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
        onClick={() => nav.push("/extra")}
      >
        <span className="">Bonus Features</span>
        <motion.div className="w-0 group-active:bg-orange-500 group-hover:w-full duration-300 h-0.5 bg-zinc-400" />
      </motion.button>
    </nav>
  );
};

export default Navigation;
