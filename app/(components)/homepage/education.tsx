import { education } from "@/app/data";
import React, { useState } from "react";
import CollegeoftheCanyons from "../svgs/CollegeoftheCanyons";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";
import CalPoly from "../svgs/CalPoly";

const Education = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {education.map((school: (typeof education)[0]) => (
        <div
          className="relative overflow-hidden rounded-lg flex flex-row gap-4 items-center p-4"
          key={school.school}
        >
          <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-900  origin-center" />
          {school.school === "College of the Canyons" && (
            <div className="mb-4 flex items-center relative z-10">
              <CollegeoftheCanyons />
            </div>
          )}
          {school.school ===
            "California Polytechnic State University, San Luis Obispo" && (
            <div className="mb-4 flex items-center relative z-10">
              <CalPoly />
            </div>
          )}
          <div className="flex flex-col relative z-10">
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
              <p>{open ? "Hide Details" : "View Details"}</p>
            </button>
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-row gap-2 w-full"
            >
              <ol className="flex flex-col bullet-list text-wrap w-1/2 gap-2 p-4 sm:p-5 sm:px-10">
                <h2 className="text-lg font-bold">Classes</h2>
                {school?.classes?.map((className: string) => (
                  <li key={className} className="list-disc">
                    {className}
                  </li>
                ))}
              </ol>
            </motion.ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
