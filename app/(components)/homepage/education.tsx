import { education } from "@/app/data";
import React, { useState } from "react";
import CollegeoftheCanyons from "../svgs/CollegeoftheCanyons";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";
import CalPoly from "../svgs/CalPoly";

type School = (typeof education)[0];

const logos: Record<string, React.ReactNode> = {
  "College of the Canyons": <CollegeoftheCanyons />,
  "California Polytechnic State University, San Luis Obispo": <CalPoly />,
};

const EducationCard = ({ school }: { school: School }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg flex flex-col sm:flex-row gap-4 sm:items-center p-4">
      <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-900  origin-center" />
      {logos[school.school] && (
        <div className="flex items-center sm:justify-center relative z-10 sm:w-80 shrink-0">
          {logos[school.school]}
        </div>
      )}
      <div className="flex flex-col relative z-10 min-w-0">
        <h3 className="text-2xl font-bold font-mono">{school.school}</h3>
        <p>{school.degree}</p>
        <p>{school.location}</p>
        <p>
          {school.startDate} - {school.endDate}
        </p>
        <button
          onClick={() => setOpen(!open)}
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
          className="bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg flex flex-row gap-2 w-full"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {education.map((school: School) => (
        <EducationCard key={school.school} school={school} />
      ))}
    </div>
  );
};

export default Education;
