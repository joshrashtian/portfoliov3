"use client";
import React, { useState } from "react";
import { Projects } from "./projects";
import { WorkExperience } from "./workExperience";
import Education from "./education";
import { motion, AnimatePresence } from "motion/react";

const tabOrder = ["projects", "workExperience", "education"];

const ProjectMenu = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: string) => {
    setDirection(tabOrder.indexOf(tab) > tabOrder.indexOf(activeTab) ? 1 : -1);
    setActiveTab(tab);
  };

  const tabContent = {
    projects: <Projects />,
    workExperience: <WorkExperience />,
    education: <Education />,
  };

  return (
    <div className="w-full origin-top pt-20 ">
      <header className="flex flex-row font-climate-crisis w-3/4 mx-auto justify-center items-center lg:w-full gap-8 md:gap-16">
        {[
          { key: "projects", label: "Projects" },
          { key: "workExperience", label: "Work Experience" },
          { key: "education", label: "Education" },
        ].map((tab) => (
          <button
            key={tab.key}
            className="relative pb-2"
            onClick={() => handleTabChange(tab.key)}
          >
            <p
              className={`text-2xl md:text-4xl uppercase tracking-wide transition-colors duration-300 ${
                activeTab === tab.key
                  ? "text-[#7a1620] dark:text-[#c23b4a]"
                  : "text-stone-400 dark:text-stone-600"
              }`}
            >
              {tab.label}
            </p>
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-underline"
                className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#7a1620] dark:bg-[#c23b4a]"
              />
            )}
          </button>
        ))}
      </header>
      <div className="w-full relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            initial={{ opacity: 0, x: 60 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 * direction }}
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
