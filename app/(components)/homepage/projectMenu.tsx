"use client";
import React, { useState } from "react";
import { Projects } from "./projects";
import { WorkExperience } from "./workExperience";
import Education from "./education";
import { motion, AnimatePresence } from "motion/react";

const ProjectMenu = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabContent = {
    projects: <Projects />,
    workExperience: <WorkExperience />,
    education: <Education />,
  };

  return (
    <div className="w-full origin-top pt-20 ">
      <header className="flex flex-row font-header w-3/4 mx-auto justify-center items-center lg:w-full gap-0.5">
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 -skew-x-40 p-4 transition-all duration-300 ${
            activeTab === "projects"
              ? "ring-2 ring-red-500 z-30 dark:ring-red-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("projects")}
        >
          <p
            className={`font-medium skew-x-40 transition-colors duration-300 ${
              activeTab === "projects" ? "text-red-600 dark:text-red-400" : ""
            }`}
          >
            Projects
          </p>
        </button>
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 -skew-x-40 p-4 transition-all duration-300 ${
            activeTab === "workExperience"
              ? "ring-2 ring-blue-500 z-30 dark:ring-blue-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("workExperience")}
        >
          <p
            className={`font-medium skew-x-40 transition-colors duration-300 ${
              activeTab === "workExperience"
                ? "text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            Work Experience
          </p>
        </button>
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 -skew-x-40 p-4 transition-all duration-300 ${
            activeTab === "education"
              ? "ring-2 ring-green-500 z-30  dark:ring-green-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("education")}
        >
          <p
            className={`font-medium skew-x-40 transition-colors duration-300 ${
              activeTab === "education"
                ? "text-green-600 dark:text-green-400"
                : ""
            }`}
          >
            Education
          </p>
        </button>
      </header>
      <div className="w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectMenu;
