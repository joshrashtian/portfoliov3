import { education, type TimelineEntry } from "@/app/data";
import React, { useState } from "react";
import CollegeoftheCanyons from "../svgs/CollegeoftheCanyons";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";
import { CLOSE_SOUND, SELECT_SOUND, useSound } from "../useSound";
import CalPoly from "../svgs/CalPoly";
import { IoChevronForward } from "react-icons/io5";

type School = (typeof education)[0];

const logos: Record<string, React.ReactNode> = {
  "College of the Canyons": <CollegeoftheCanyons />,
  "Cal Poly San Luis Obispo": <CalPoly />,
};

const Timeline = ({ entries }: { entries: TimelineEntry[] }) => (
  <ol className="flex flex-col p-4 sm:p-5 sm:px-10 w-full">
    {entries.map((entry, i) => (
      <li key={entry.term} className="relative pl-6 pb-5 last:pb-0">
        {i < entries.length - 1 && (
          <span className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-600" />
        )}
        <span className="absolute left-0 top-1.5 size-3 rounded-full bg-blue-300 dark:bg-[#c23b4a]" />
        <h4 className="font-bold font-mono">{entry.term}</h4>
        {entry.classes?.length ? (
          <p className="text-sm text-zinc-600 font-mono dark:text-zinc-400">
            {entry.classes.join(" · ")}
          </p>
        ) : null}
        {entry.milestones?.map((milestone) => (
          <p
            key={milestone}
            className="mt-1 text-sm text-zinc-500 flex flex-row gap-3 items-center"
          >
            <IoChevronForward className="text-blue-500 dark:text-blue-400" />{" "}
            {milestone}
          </p>
        ))}
      </li>
    ))}
  </ol>
);

const EducationCard = ({ school }: { school: School }) => {
  const [open, setOpen] = useState(false);
  const playSelect = useSound(SELECT_SOUND);
  const playClose = useSound(CLOSE_SOUND);

  const toggle = () => {
    if (open) playClose();
    else playSelect();
    setOpen(!open);
  };

  return (
    <div className="relative overflow-hidden odd:border-b-2 border-dashed border-zinc-200 py-3 flex flex-col sm:flex-row gap-4 sm:items-start p-4">
      <div className="absolute inset-0 z-0  dark:bg-zinc-900  origin-center" />
      {logos[school.school] && (
        <div className="flex items-center sm:justify-center relative z-10 h-16 sm:h-20 sm:w-40 shrink-0 [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full">
          {logos[school.school]}
        </div>
      )}
      <div className="flex flex-col relative w-full z-10 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-2xl font-bold font-mono">{school.school}</h3>
          <p className="text-sm text-zinc-500 font-mono shrink-0">
            {school.startDate} - {school.endDate}
          </p>
        </div>
        <p className="text-base font-black font-mono">{school.degree}</p>
        <p>{school.location}</p>
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
          className=" dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-row gap-2 w-full"
        >
          {school.timeline?.length ? (
            <Timeline entries={school.timeline} />
          ) : (
            <div className="flex flex-col bullet-list text-wrap gap-2 p-4 sm:p-5 sm:px-10">
              <h2 className="text-lg font-bold">Classes</h2>
              <ol className="flex flex-col gap-2">
                {school?.classes?.map((className: string) => (
                  <li key={className} className="list-disc">
                    {className}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <div className="flex flex-col border border-zinc-300 rounded-2xl gap-4 mt-4">
      {education.map((school: School) => (
        <EducationCard key={school.school} school={school} />
      ))}
    </div>
  );
};

export default Education;
