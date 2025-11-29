"use client";
import Image from "next/image";
import Navigation from "./(components)/nav";
import { useRef } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";
import About from "./(components)/homepage/about";
import Tilt from "react-parallax-tilt";

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
          className="flex min-h-screen h-full relative  flex-col items-center justify-start py-16 px-16 bg-white dark:bg-black sm:items-start"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, type: "spring" }}
            className="absolute z-50 left-0 bottom-24 w-2xl max-w-2xl h-2 bg-orange-400"
          />
          <header className="flex flex-row w-full items-center justify-between">
            <motion.h1 className="text-4xl max-w-2xl font-bold">
              Joshua Rashtian.
            </motion.h1>
            <div className="mt-8 text-right">
              <h2 className="text-2xl font-bold">Los Angeles, CA</h2>
              <h3 className="text-lg text-gray-500">Software Engineer</h3>
            </div>
          </header>
          <p>Embracing the revolution, whether it be in code and philosophy.</p>
          <div className="grid grid-cols-3 w-full h-full gap-4">
            <Tilt>
              <div className="col-span-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"></div>
            </Tilt>
            <Tilt>
              <div className="col-span-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"></div>
            </Tilt>
            <Tilt>
              <div className="col-span-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"></div>
            </Tilt>
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
