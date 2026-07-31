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
import { useRouter } from "next/navigation";

const BLIP_URL = "/Blip4.wav";

const navItems = [
  { id: "home", label: "Home", icon: <IoHomeOutline /> },
  { id: "about", label: "About", icon: <IoPersonOutline /> },
  { id: "experience", label: "Experience", icon: <IoRocketOutline /> },
  { id: "contact", label: "Contact", icon: <IoMailOutline /> },

];

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  const blipRef = useRef<HTMLAudioElement | null>(null);

  const nav = useRouter();
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
      navTo(id);
    },
    [navTo, playBlip]
  );

  return (
    <nav className=" w-3/4  h-16  justify-between flex fixed top-0">
      {navItems.map(({ id, label, icon }) => (
        <motion.button
          key={id}
          className="relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col  hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200  w-full dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
          onClick={() => handleNav(id)}
        >


            {label}
            <motion.div className="w-0 group-active:bg-orange-500 group-hover:w-1/4 duration-300 h-0.5 bg-zinc-400" />
        </motion.button>
      ))}
      <motion.button
        className="relative group text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col  hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200  w-full dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
        onClick={() => nav.push("/extra")}
      >
        <IoMenuOutline />
        <span className="text-sm">Extras</span>
      </motion.button>
    </nav>
  );
};

export default Navigation;
