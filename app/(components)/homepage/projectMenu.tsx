"use client";
import React, { useState } from "react";
import { Projects } from "./projects";
import WorkExperience from "./workExperience";
import Education from "./education";
const ProjectMenu = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <header className="flex flex-row w-full gap-4">
        <button
          className="bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4"
          onClick={() => handleTabChange("projects")}
        >
          <p>Projects</p>
        </button>
        <button
          className="bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4"
          onClick={() => handleTabChange("workExperience")}
        >
          <p>Work Experience</p>
        </button>
        <button
          className="bg-zinc-100 w-1/3 dark:bg-zinc-900 rounded-lg p-4"
          onClick={() => handleTabChange("education")}
        >
          <p>Education</p>
        </button>
      </header>
      <div className="w-full">
        {activeTab === "projects" && <Projects />}
        {activeTab === "workExperience" && <WorkExperience />}
        {activeTab === "education" && <Education />}
      </div>
    </div>
  );
};

export default ProjectMenu;
