"use client";
import Image, { type StaticImageData } from "next/image";
import React, { forwardRef, useState } from "react";
import MESAIcon from "../../(assets)/MESA.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";
import { CLOSE_SOUND, SELECT_SOUND, useSound } from "../useSound";
import HACKMESAIcon from "../../(assets)/images/hackmesa.png";
import { work } from "@/app/data";
import { IoChevronForward } from "react-icons/io5";

type Job = (typeof work)[0];

const logos: Record<string, StaticImageData> = {
  HACKMESA: HACKMESAIcon,
  MESA: MESAIcon,
};

const roleColors: Record<string, string> = {
  HACKMESA: "text-blue-600 dark:text-blue-500",
  MESA: "text-orange-600 dark:text-orange-500",
};

const WorkCard = ({ job }: { job: Job }) => {
  const [open, setOpen] = useState(false);
  const playSelect = useSound(SELECT_SOUND);
  const playClose = useSound(CLOSE_SOUND);

  const toggle = () => {
    if (open) playClose();
    else playSelect();
    setOpen(!open);
  };

  return (
    <div className="relative overflow-hidden not-last:border-b-2 border-dashed border-zinc-200 py-3 flex flex-col sm:flex-row gap-4 sm:items-start p-4">
      {logos[job.company] && (
        <div className="flex items-center sm:justify-center relative z-10 h-16 sm:h-20 sm:w-40 shrink-0">
          <Image
            src={logos[job.company]}
            alt={job.company}
            className="rounded-lg object-cover h-full w-auto"
            width={80}
            height={80}
          />
        </div>
      )}
      <div className="flex flex-col relative w-full z-10 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-2xl font-bold font-mono">{job.company}</h3>
          <p className="text-sm font-mono text-zinc-500 shrink-0">
            {job.startDate} - {job.endDate}
          </p>
        </div>
        <p className="text-slate-600">{job.role}</p>
        <p>{job.location}</p>

        <button
          onClick={toggle}
          className="flex flex-row gap-2 self-start -ml-2 mt-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg p-2 duration-500 items-center"
        >
          <IoIosArrowDown
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
          <p>{open ? "Hide Details" : "View Details"}</p>
        </button>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className=" dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-col gap-2 w-full"
        >
          <ol className="flex flex-col bullet-list text-wrap gap-2 p-4 sm:p-5 sm:px-10">
            {job.details.map((detail) => (
              <li key={detail} className="flex flex-row gap-2 items-center">
                <IoChevronForward className="text-blue-500 dark:text-blue-400" />{" "}
                {detail}
              </li>
            ))}
          </ol>
          {job.technologies_used && job.technologies_used.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-10 mt-2">
              {job.technologies_used.map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export const WorkExperience = forwardRef<HTMLDivElement, object>(
  (props, ref) => {
    return (
      <div
        className="flex flex-col border border-zinc-300 rounded-2xl gap-4 mt-4"
        ref={ref}
      >
        {work.map((job) => (
          <WorkCard key={`${job.company}-${job.role}`} job={job} />
        ))}
      </div>
    );
  },
);

WorkExperience.displayName = "WorkExperience";
