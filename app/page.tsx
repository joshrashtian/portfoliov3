"use client";
import Navigation from "./(components)/nav";
import { useRef } from "react";
import { motion } from "motion/react";
import About from "./(components)/homepage/about";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLocationOutline,
} from "react-icons/io5";
import Link from "next/link";
import ProjectMenu from "./(components)/homepage/projectMenu";

export default function Home() {
  const sectionRefMap = useRef<{ [key: string]: HTMLDivElement | null }>({
    home: null,
    about: null,
    experience: null,
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
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="w-full max-w-7xl">
        <motion.div
          className="flex min-h-screen h-full relative flex-col-reverse items-start justify-start sm:justify-between gap-10 sm:gap-0 pt-36 sm:pt-16 pb-16 sm:pb-16 px-6 sm:px-16 dark:bg-black"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, type: "spring" }}
            className="absolute left-0 bottom-12 w-2xl max-w-2xl h-2 bg-orange-400"
          />
          <ol className="text-left sm:text-right sm:absolute sm:right-0 sm:top-24 w-full sm:w-auto">
            <h2 className="text-2xl flex flex-row gap-2 justify-start sm:justify-center items-center font-bold">
              <IoLocationOutline className="text-2xl" /> Los Angeles, CA
            </h2>
            <h3 className="text-lg text-gray-500">Software Engineer</h3>
          </ol>

          <footer className="flex flex-row w-full pb-10 sm:pb-20 items-center justify-between sm:mt-0">
            <div>
              <motion.h1 className="text-4xl font-climate-crisis sm:text-5xl max-w-2xl leading-tight">
                Joshua Rashtian.
              </motion.h1>
              <p className="text-base sm:text-base leading-relaxed max-w-lg mt-2">
                Embracing the revolution, whether it be in code and philosophy.
                <br /> Full Stack Engineer and Computer Engineering and Science
                Student based in Los Angeles.
              </p>
              <ol className="flex mt-3 sm:mt-2 flex-row gap-3 sm:gap-2">
                <Link
                  target="_blank"
                  className="text-4xl flex flex-row gap-2 justify-center items-center"
                  href="https://github.com/joshrashtian"
                >
                  <IoLogoGithub />
                </Link>

                <Link
                  target="_blank"
                  className="text-4xl flex flex-row gap-2 justify-center items-center"
                  href="https://www.linkedin.com/in/joshrashtian/"
                >
                  <IoLogoLinkedin />
                </Link>
                <Link
                  target="_blank"
                  className="text-4xl flex flex-row gap-2 justify-center items-center"
                  href="https://www.instagram.com/joshuajrashtian/"
                >
                  <IoLogoInstagram />
                </Link>
              </ol>
            </div>
            {/* joshua tree svg */}
          </footer>
        </motion.div>
        <div
          className="h-full flex items-center justify-center  "
          ref={(el) => assignRef("about", el as HTMLDivElement)}
        >
          <About />
        </div>

        <div
          className="h-screen   "
          ref={(el) => assignRef("experience", el as HTMLDivElement)}
        >
          <ProjectMenu />
        </div>
      </main>
      <Navigation navTo={navTo} />
    </div>
  );
}
