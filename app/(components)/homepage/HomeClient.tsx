"use client";
import { NAV_EVENT } from "../nav";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import About from "./about";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoArrowForward,
  IoPinOutline,
  IoLocation,
  IoCubeOutline,
  IoMail,
  IoLocationSharp,
} from "react-icons/io5";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import ProjectMenu from "./projectMenu";
import JoshuaTree from "../svgs/JoshuaTree";
import { ColorSchema } from "../../color";
import Contact from "./contact";
import { Playwrite_US_Modern } from "next/font/google";

const playwrite = Playwrite_US_Modern({ weight: "400" });

export default function HomeClient({
  latestPosts,
}: {
  latestPosts: ReactNode;
}) {
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const sectionRefMap = useRef<{ [key: string]: HTMLDivElement | null }>({
    home: null,
    about: null,
    experience: null,
    blog: null,
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

  const navToRef = useRef(navTo);
  navToRef.current = navTo;

  useEffect(() => {
    const onNav = (e: Event) =>
      navToRef.current((e as CustomEvent<string>).detail);
    window.addEventListener(NAV_EVENT, onNav);

    const section = window.location.hash.slice(1);
    if (section) {
      navToRef.current(section);
      history.replaceState(null, "", "/");
    }

    return () => window.removeEventListener(NAV_EVENT, onNav);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="w-full max-w-7xl">
        <motion.div
          className="relative flex min-h-screen  h-full items-center px-6 py-24 sm:px-16 dark:bg-black"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
          data-nav-section="home"
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
                <div className={`relative w-full overflow-hidden rounded-xl border-2 ${ColorSchema.border_ink} ${ColorSchema.card_bg} p-6 sm:p-10 lg:p-14`}>
                  <JoshuaTree
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[50%] text-[#3a0a10]/5 dark:text-white/5"
                  />

                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                    <span className={`inline-flex items-center gap-2 rounded-full ${ColorSchema.ink_text} text-base font-mono font-black  dark:bg-white dark:text-black`}>
<IoLocationSharp />
                      San Luis Obispo, CA
                    </span>
                    <div className={`text-right text-sm font-mono ${ColorSchema.muted_text}`}>
                      <p>Software Engineer</p>
                      <p>Cal Poly CSC Student</p>
                    </div>
                  </div>

                  <p
                    className={`${playwrite.className} relative z-10 mt-6 text-lg sm:hidden ${ColorSchema.muted_text}`}
                  >
                    Greetings from
                  </p>
                  <h1 className="relative z-10 mt-3 font-climate-crisis text-4xl leading-[0.9] tracking-tight sm:mt-24 sm:text-8xl lg:text-[7rem]">
                    <span className="relative inline-block">
                      <svg
                        aria-hidden
                        viewBox="-20 -40 220 180"
                        overflow="visible"
                        className={`${playwrite.className} pointer-events-none absolute -left-[0.14em] hidden -translate-x-5 translate-y-8 -top-[0.5em] h-[1.05em] w-[1.65em] overflow-visible sm:block ${ColorSchema.muted_text}`}
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
                    Rashtian
                    <span className={`rotate-6 absolute ${ColorSchema.text_maroon}`}>
                      !
                    </span>
                  </h1>

                  <div className="relative z-10 mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-lg">
                      <p className={`text-base leading-relaxed ${ColorSchema.muted_text}`}>
                        Full Stack Engineer and Computer Science Student with 4
                        years of experience and a history of game development
                        and filmography.
                      </p>
                      <div className="mt-4 flex flex-row gap-4 text-2xl">
                        <Link
                          target="_blank"
                          aria-label="GitHub"
                          className={`flex items-center gap-1 font-mono text-sm duration-300 ${ColorSchema.muted_text} ${ColorSchema.hover_ink_text}`}
                          href="https://github.com/joshrashtian"
                        >
                          <IoLogoGithub className="text-base" /> GitHub
                        </Link>
                        <Link
                          target="_blank"
                          aria-label="LinkedIn"
                          className={`flex items-center gap-1 font-mono text-sm duration-300 ${ColorSchema.muted_text} ${ColorSchema.hover_ink_text}`}
                          href="https://www.linkedin.com/in/joshrashtian/"
                        >
                          <IoLogoLinkedin className="text-base" /> LinkedIn
                        </Link>
                        <Link
                          target="_blank"
                          aria-label="Instagram"
                          className={`flex items-center gap-1 font-mono text-sm duration-300 ${ColorSchema.muted_text} ${ColorSchema.hover_ink_text}`}
                          href="https://www.instagram.com/joshuajrashtian/"
                        >
                          <IoLogoInstagram className="text-base" /> Instagram
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <button
                      onClick={() => {setIsFlipped((prev) => !prev)}}

                      className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full ${ColorSchema.blush_maroon} px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 sm:self-auto`}
                    >
                     Contact <IoMail  />
                    </button>
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full ${ColorSchema.core_maroon} ${ColorSchema.hover_maroon} px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 sm:self-auto`}
                    >
                      View Resume <IoArrowForward />
                      </Link>
                      </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute inset-0 h-full ${
                  isFlipped ? "" : "pointer-events-none"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Contact />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              aria-pressed={isFlipped}
              aria-label={
                isFlipped ? "Flip to front of postcard" : "Flip to contact form"
              }
              className={`absolute -top-4 right-4 z-30 -rotate-2 flex items-center gap-1.5 rounded-full border border-black/10 ${ColorSchema.core_maroon} ${ColorSchema.hover_maroon} text-white px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:scale-105 dark:border-white/10`}
            >
              {isFlipped ? "Back to Front" : "Flip to Contact"}
            </button>
          </div>
        </motion.div>
        <div
          className="h-full flex items-center justify-center  "
          ref={(el) => assignRef("about", el as HTMLDivElement)}
          data-nav-section="about"
        >
          <About />
        </div>

        <div
          className="min-h-screen pb-24 xl:pb-0"
          ref={(el) => assignRef("experience", el as HTMLDivElement)}
          data-nav-section="experience"
        >
          <ProjectMenu />
        </div>

        <div
          ref={(el) => assignRef("blog", el as HTMLDivElement)}
          data-nav-section="blog"
        >
          {latestPosts}
        </div>
      </main>
    </div>
  );
}
