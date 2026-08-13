"use client";
import Navigation from "./(components)/nav";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import About from "./(components)/homepage/about";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoArrowForward,
  IoPinOutline,
  IoLocation,
  IoCubeOutline,
} from "react-icons/io5";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import ProjectMenu from "./(components)/homepage/projectMenu";
import JoshuaTree from "./(components)/svgs/JoshuaTree";
import Contact from "./(components)/homepage/contact";
import { Playwrite_US_Modern } from "next/font/google";

const playwrite = Playwrite_US_Modern({ weight: "400" });

export default function Home() {
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const sectionRefMap = useRef<{ [key: string]: HTMLDivElement | null }>({
    home: null,
    about: null,
    experience: null,
    extras: null,
  });

  function assignRef(section: string, ref: HTMLDivElement | null) {
    sectionRefMap.current[section] = ref;
  }

  const navTo = (section: string) => {
    if (section === "contact") {
      setIsFlipped(true);
      sectionRefMap.current["home"]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }
    if (section === "home") {
      setIsFlipped(false);
    }
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
          className="relative flex min-h-screen rotate-1 h-full items-center px-6 py-24 sm:px-16 dark:bg-black"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
        >
          <div className="relative w-full" style={{ perspective: 2000 }}>
            <motion.div
              className="relative w-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >

              <div
                className={isFlipped ? "pointer-events-none" : ""}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Tilt
                  tiltEnable={tiltEnabled && !isFlipped}
                  tiltMaxAngleX={2}
                  tiltMaxAngleY={2}
                  perspective={500}
                  glareEnable={true}
                  glareMaxOpacity={0.45}
                  scale={1.02}
                  className="relative w-full overflow-hidden rounded-xl border-2 border-black bg-stone-50 p-6 sm:p-10 lg:p-14 dark:border-white dark:bg-zinc-950"
                >
                  <JoshuaTree
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[50%] text-black/5 dark:text-white/5"
                  />

                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
                      <IoLocation />
                      San Luis Obispo, CA
                    </span>
                    <div className="text-right text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                      <p>Software Engineer</p>
                      <p>Cal Poly CSC Student</p>
                    </div>
                  </div>

                  <p
                    className={`${playwrite.className} relative z-10 mt-6 text-lg text-zinc-500 sm:hidden dark:text-zinc-400`}
                  >
                    Greetings from
                  </p>
                  <h1 className="relative z-10 mt-3 font-climate-crisis text-4xl leading-[0.9] tracking-tight sm:mt-24 sm:text-8xl lg:text-[7rem]">
                    <span className="relative inline-block">
                      <svg
                        aria-hidden
                        viewBox="-20 -40 220 180"
                        overflow="visible"
                        className={`${playwrite.className} pointer-events-none absolute -left-[0.14em] hidden -translate-x-5 translate-y-8 -top-[0.5em] h-[1.05em] w-[1.65em] overflow-visible text-zinc-500 sm:block dark:text-zinc-400`}
                      >
                        <path
                          id="greetingsCurve"
                          d="M-10 20 A 130 130 0 0 1 177 -18"
                          fill="none"
                        />
                        <text fontSize="24">
                          <textPath
                            href="#greetingsCurve"
                            xlinkHref="#greetingsCurve"
                            startOffset="6"
                          >
                            Greetings from
                          </textPath>
                        </text>
                      </svg>
                      Joshua
                    </span>
                    <br />
                    Rashtian<span className="rotate-6 absolute text-orange-600">!</span>
                  </h1>

                  <div className="relative z-10 mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-lg">
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Full Stack Engineer + Computer Science Student, 3 years of
                        experience. Based between Los Angeles and San Luis Obispo.
                      </p>
                      <div className="mt-4 flex flex-row gap-4 text-2xl">
                        <Link
                          target="_blank"
                          aria-label="GitHub"
                          href="https://github.com/joshrashtian"
                        >
                          <IoLogoGithub />
                        </Link>
                        <Link
                          target="_blank"
                          aria-label="LinkedIn"
                          href="https://www.linkedin.com/in/joshrashtian/"
                        >
                          <IoLogoLinkedin />
                        </Link>
                        <Link
                          target="_blank"
                          aria-label="Instagram"
                          href="https://www.instagram.com/joshuajrashtian/"
                        >
                          <IoLogoInstagram />
                        </Link>
                      </div>
                    </div>
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-orange-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 sm:self-auto"
                    >
                      View Resume <IoArrowForward />
                    </Link>
                  </div>
                </Tilt>
              </div>


              <div
                className={`absolute inset-0 h-full ${
                  isFlipped ? "" : "pointer-events-none"
                }`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <Contact />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              aria-pressed={isFlipped}
              aria-label={isFlipped ? "Flip to front of postcard" : "Flip to contact form"}
              className="absolute -top-4 right-4 z-30 -rotate-2 flex items-center gap-1.5 rounded-full border border-black/10 bg-orange-400 text-black px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:scale-105 hover:bg-orange-300 dark:border-white/10"
            >
              {isFlipped ? "Back to Front" : "Flip to Contact"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setTiltEnabled((prev) => !prev)}
            aria-pressed={tiltEnabled}
            aria-label={tiltEnabled ? "Disable tilt effect" : "Enable tilt effect"}
            className="absolute bottom-12 right-0 z-20 -rotate-3 flex items-center gap-1.5 rounded-full border border-black/10 bg-blue-500 text-white px-3 py-1.5 text-xs font-medium  backdrop-blur transition hover:bg-blue-400 dark:border-white/10 dark:bg-black/40 dark:text-zinc-300 dark:hover:bg-black/60"
          >
            <IoCubeOutline className={`${tiltEnabled ? "" : "opacity-40"} duration-500`} />
            {tiltEnabled ? "Tilt: On" : "Tilt: Off"}
          </button>
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
      </main>

      <Navigation navTo={navTo} />
    </div>
  );
}
