"use client";
import Image from "next/image";
import Navigation from "./(components)/nav";
import { useRef } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";
import About from "./(components)/homepage/about";

export default function Home() {
  const sectionRefMap = useRef<{ [key: string]: HTMLDivElement | null }>({
    home: null,
    about: null,
    contact: null,
  });

  function assignRef(section: string, ref: HTMLDivElement | null) {
    sectionRefMap.current[section] = ref;
  }

  const navTo = (section: string) => {
    if (sectionRefMap.current[section]) {
      sectionRefMap.current[section]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-lexend dark:bg-black">
      <main className="w-full max-w-7xl">
        <motion.div
          className="flex min-h-screen relative  flex-col items-center justify-end py-32 px-16 bg-white dark:bg-black sm:items-start"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, type: "spring" }}
            className="absolute z-50 left-0 bottom-24 w-2xl max-w-2xl h-2 bg-orange-400"
          />
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-9xl absolute left-0 bottom-24 max-w-2xl font-bold"
          >
            Joshua Rashtian.
          </motion.h1>
          <div className="absolute right-0 text-right top-8">
            <h2 className="text-2xl font-bold">Los Angeles, CA</h2>
            <h3 className="text-lg text-gray-500">Software Engineer</h3>
          </div>
        </motion.div>
        <div
          className="h-screen flex items-center justify-center  "
          ref={(el) => assignRef("about", el as HTMLDivElement)}
        >
          <About />
        </div>
        <div
          className="h-screen flex items-center justify-center  "
          ref={(el) => assignRef("contact", el as HTMLDivElement)}
        >
          <h2>Contact</h2>
        </div>
      </main>
      <Navigation navTo={navTo} />
    </div>
  );
}
