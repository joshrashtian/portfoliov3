"use client";
import Link from "next/link";
import React from "react";

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className="fixed p-4 left-1/2 -translate-x-1/2 bottom-8 w-[600px] rounded-3xl bg-zinc-50/50 backdrop-blur-sm border border-zinc-200 dark:bg-black dark:border-zinc-800 flex justify-center items-center gap-6 font-gabarito">
      <button
        className="text-2xl cursor-pointer "
        onClick={() => navTo("home")}
      >
        Home
      </button>
      <button
        className="text-2xl cursor-pointer "
        onClick={() => navTo("about")}
      >
        About
      </button>
      <button
        className="text-2xl cursor-pointer "
        onClick={() => navTo("contact")}
      >
        Contact
      </button>
      <button
        className="text-2xl cursor-pointer  "
        onClick={() => navTo("projects")}
      >
        Projects
      </button>
      <Link href={"https://2024.joshuarashtian.com"}>
        <p className="text-2xl cursor-pointer ">2024</p>
      </Link>
    </nav>
  );
};
export default Navigation;
