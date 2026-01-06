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
    <div className="w-full origin-top ">
      <header className="flex flex-row w-3/4 mx-auto justify-center items-center lg:w-full gap-4">
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4 transition-all duration-300 ${
            activeTab === "projects"
              ? "ring-2 ring-blue-500 dark:ring-blue-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("projects")}
        >
          <p
            className={`font-medium transition-colors duration-300 ${
              activeTab === "projects" ? "text-blue-600 dark:text-blue-400" : ""
            }`}
          >
            Projects
          </p>
        </button>
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4 transition-all duration-300 ${
            activeTab === "workExperience"
              ? "ring-2 ring-blue-500 dark:ring-blue-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("workExperience")}
        >
          <p
            className={`font-medium transition-colors duration-300 ${
              activeTab === "workExperience"
                ? "text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            Work Experience
          </p>
        </button>
        <button
          className={`bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4 transition-all duration-300 ${
            activeTab === "education"
              ? "ring-2 ring-blue-500 dark:ring-blue-400 scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => handleTabChange("education")}
        >
          <p
            className={`font-medium transition-colors duration-300 ${
              activeTab === "education"
                ? "text-blue-600 dark:text-blue-400"
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
