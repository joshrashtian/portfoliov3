"use client";
import Link from "next/link";
import React from "react";

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className="fixed bottom-0 right-0 p-4 left-0 w-full bg-white dark:bg-black">
      <button className="text-2xl font-bold" onClick={() => navTo("home")}>
        Home
      </button>
      <button className="text-2xl font-bold" onClick={() => navTo("about")}>
        About
      </button>
      <button className="text-2xl font-bold" onClick={() => navTo("contact")}>
        Contact
      </button>
      <button className="text-2xl font-bold" onClick={() => navTo("projects")}>
        Projects
      </button>
    </nav>
  );
};

export default Navigation;
