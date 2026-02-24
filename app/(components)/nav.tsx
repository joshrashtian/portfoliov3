"use client";

import Link from "next/link";
import { motion } from "motion/react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "projects", label: "Projects" },
];

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className="fixed top-4 z-50 text-lg bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800 p-4 px-10 rounded-full right-1/2 translate-x-1/2 font-mono h-14 flex justify-center items-center gap-8">
      {navItems.map(({ id, label }) => (
        <motion.button
          key={id}
          className="relative text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-1"
          onClick={() => navTo(id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "tween", duration: 0.15 }}
        >
          <span className="relative">
            {label}
            <motion.span
              className="absolute left-0 right-0 -bottom-0.5 h-px bg-zinc-400 dark:bg-zinc-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.button>
      ))}
      <Link
        href="https://2024.joshuarashtian.com"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 focus-visible:ring-offset-2 rounded px-1 transition-colors duration-150"
      >
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "tween", duration: 0.15 }}
        >
          2024
        </motion.span>
      </Link>
    </nav>
  );
};

export default Navigation;
