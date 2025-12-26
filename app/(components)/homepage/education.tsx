import { education } from "@/app/data";
import React, { useState } from "react";
import CollegeoftheCanyons from "../svgs/CollegeoftheCanyons";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";

const Education = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {education.map((school: (typeof education)[0]) => (
        <div
          className="bg-zinc-100 dark:bg-zinc-900 flex flex-row gap-4 items-center rounded-lg p-4"
          key={school.school}
        >
          {school.school === "College of the Canyons" && (
            <div className="mb-4 flex items-center">
              <CollegeoftheCanyons />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{school.school}</h3>
            <p>{school.degree}</p>
            <p>{school.location}</p>
            <p>
              {school.startDate} - {school.endDate}
            </p>
            <button
              onClick={handleOpen}
              className="flex flex-row gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg p-2 duration-500 items-center"
            >
              <IoIosArrowDown className={`${open ? "rotate-180" : ""}`} />{" "}
              <p>{open ? "Hide Classes" : "View Classes"}</p>
            </button>
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-col gap-2"
            >
              {school.classes.map((className: string) => (
                <li key={className} className="px-4 m-1 first:pt-4 last:pb-4">
                  <p>{className}</p>
                </li>
              ))}
            </motion.ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
