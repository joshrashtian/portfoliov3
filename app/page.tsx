"use client";
import Image from "next/image";
import Navigation from "./(components)/nav";
import { useRef } from "react";
import { useEffect } from "react";
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-7xl">
        <div
          className="flex min-h-screen  flex-col items-center justify-end py-32 px-16 bg-white dark:bg-black sm:items-start"
          ref={(el) => assignRef("home", el as HTMLDivElement)}
        >
          <h1 className="text-8xl max-w-2xl font-bold">Joshua Rashtian.</h1>
        </div>
        <div
          className="h-screen flex items-center justify-center  "
          ref={(el) => assignRef("about", el as HTMLDivElement)}
        >
          <h2>About</h2>
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
