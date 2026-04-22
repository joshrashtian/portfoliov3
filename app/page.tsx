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
  IoDocumentTextOutline,
} from "react-icons/io5";
import Link from "next/link";
import ProjectMenu from "./(components)/homepage/projectMenu";
import JoshuaTree from "./(components)/svgs/JoshuaTree";

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
            className="pointer-events-none absolute left-0 bottom-12 z-[1] h-2 max-w-2xl w-2xl bg-gradient-to-r from-orange-400 via-orange-400 to-orange-400/0"
          />
          <ol className="text-left sm:text-right sm:absolute sm:right-0 sm:top-24 w-full sm:w-auto">
            <h2 className="text-2xl flex flex-row gap-2 justify-start sm:justify-center items-center font-bold">
              <IoLocationOutline className="text-2xl" /> Los Angeles, CA
            </h2>
            <h3 className="text-lg text-gray-500">Software Engineer</h3>
          </ol>

          <footer className="relative z-10 mt-auto flex w-full flex-col-reverse items-center gap-10 pb-10 sm:mt-0 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-16 lg:gap-10">
            <div className="w-full max-w-2xl flex-1 min-w-0 sm:w-auto">
              <motion.h1 className="text-7xl w-32 font-climate-crisis max-w-2xl leading-tight">
                Joshua Rashtian.
              </motion.h1>
              <p className="text-base sm:text-base leading-relaxed max-w-lg mt-2">
                Embracing the revolution, whether it be in code and philosophy.
                <br /> Full Stack Engineer + Computer Science Student with 3
                years of experience based in Los Angeles / San Luis Obispo.
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
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="text-xl font-header -skew-x-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-2 flex flex-row gap-2 justify-center items-center hover:scale-105 transition-all duration-300"
                >
                  <IoDocumentTextOutline className="text-3xl skew-x-12" />
                  <span className="skew-x-12">Resume</span>
                </Link>
              </ol>
            </div>
            <div className="relative flex w-full max-w-[15rem] shrink-0 flex-col items-center justify-end sm:max-w-none sm:w-[min(42vw,22rem)] sm:items-end lg:w-[min(36vw,26rem)]">
              <JoshuaTree className="h-auto w-full text-zinc-950 mix-blend-multiply dark:mix-blend-normal dark:text-orange-400/75 [filter:drop-shadow(0_1px_0_rgba(0,0,0,0.06))] max-sm:max-h-48" />
            </div>
          </footer>
        </motion.div>
        <div
          className="h-full flex items-center justify-center  "
          ref={(el) => assignRef("about", el as HTMLDivElement)}
        >
          <About />
        </div>

        <div
          className="h-fit   "
          ref={(el) => assignRef("experience", el as HTMLDivElement)}
        >
          <ProjectMenu />
        </div>
        <div
          className="h-screen w-full pt-20"
          ref={(el) => assignRef("contact", el as HTMLDivElement)}
        >
          <h1 className="text-6xl font-climate-crisis font-bold">Contact Me</h1>
        </div>
      </main>

      <Navigation navTo={navTo} />
    </div>
  );
}
