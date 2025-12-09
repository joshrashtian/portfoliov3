"use client";
import Link from "next/link";
import React from "react";

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className="fixed p-4 left-1/2 -translate-x-1/2 bottom-8 w-[600px] rounded-3xl bg-zinc-50/50 backdrop-blur-2xl border-4 border-white dark:border-zinc-700 shadow-2xl shadow-black/20 dark:shadow-black/40 flex justify-center items-center gap-6 font-gabarito">
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
