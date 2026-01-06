"use client";
import Image from "next/image";
import React, { forwardRef, useState } from "react";
import MESAIcon from "../../(assets)/MESA.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";

export const WorkExperience = forwardRef<HTMLDivElement, object>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };
    return (
      <div
        className=" flex-col flex p-3 sm:p-5 items-center justify-center gap-5"
        ref={ref}
      >
        <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-left w-full">
          Work Experience
        </h2>
        <section className="flex flex-col group overflow-hidden w-full xl:flex-row duration-500 p-3 sm:p-5 bg-zinc-100 dark:bg-zinc-900 rounded-lg gap-4 sm:gap-2 items-center justify-center">
          <Image
            src={MESAIcon}
            alt="MESA"
            className="rounded-lg object-cover w-full sm:w-48 xl:w-60 h-auto"
            width={240}
            height={240}
          />
          <div className="w-full xl:w-3/4 flex flex-col items-center xl:items-end justify-center h-full p-3 sm:p-5">
            <h4 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-center xl:text-left w-full">
              MESA
            </h4>
            <p className="text-lg sm:text-xl font-mono dark:text-orange-500 text-orange-600 text-center xl:text-left w-full">
              Software Engineer / Tutor
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-zinc-300 text-center xl:text-left w-full">
              College of the Canyons, Valencia, California
            </p>
            <p className="text-base sm:text-lg dark:text-zinc-300 text-gray-500 text-center xl:text-left w-full">
              January 2024 - June 2026
            </p>
            <button
              onClick={handleOpen}
              className="flex flex-row gap-2 items-center justify-center mt-2"
            >
              {" "}
              <IoIosArrowDown className={`${open ? "rotate-180" : ""}`} />{" "}
              <p>{open ? "Hide Details" : "View Details"}</p>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-col gap-2 w-full mt-2"
            >
              <ol className="flex flex-col bullet-list text-wrap w-full gap-2 p-4 sm:p-5 sm:px-10">
                <li className="list-disc">
                  Developer of MESA College Website.
                </li>
                <li className="list-disc">
                  Tutor for Calculus, Physics, and Computer Science.
                </li>
                <li className="list-disc">
                  Lead Developer and Creator for Various Projects (MESAConnect,
                  MESAMobile, MESAKiosk)
                </li>
                <li className="list-disc">
                  Assisted with the development of the MESA College Website.
                </li>
              </ol>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }
);

WorkExperience.displayName = "WorkExperience";
