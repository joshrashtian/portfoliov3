"use client";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const Navigation = ({ navTo }: { navTo: (section: string) => void }) => {
  return (
    <nav className="fixed top-4 border-b border-gray-300 border-dashed dark:border-gray-800 left-12  h-16 flex justify-center items-center gap-6 font-mono ">
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
