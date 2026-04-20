"use client";

import { motion } from "motion/react";
import {
  IoHomeOutline,
  IoPersonOutline,
  IoMailOutline,
  IoRocketOutline,
} from "react-icons/io5";

const navItems = [
  { id: "home", label: "Home", icon: <IoHomeOutline /> },
  { id: "about", label: "About", icon: <IoPersonOutline /> },
  { id: "experience", label: "Experience", icon: <IoRocketOutline /> },
  { id: "contact", label: "Contact", icon: <IoMailOutline /> },
];

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className=" w-full font-header h-16 bg-zinc-50 dark:bg-zinc-900 justify-between flex fixed top-0">
      {navItems.map(({ id, label, icon }) => (
        <motion.button
          key={id}
          className="relative text-zinc-600 transition-all duration-300 justify-center items-start flex flex-col border-r hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200  w-full dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-4 sm:px-2"
          onClick={() => navTo(id)}
        >
          <span className="items-center flex-row gap-2 flex">
            {icon}
            {label}
            <motion.span className="inline-block  right-0  bg-zinc-400 dark:bg-zinc-500" />
          </span>
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;
