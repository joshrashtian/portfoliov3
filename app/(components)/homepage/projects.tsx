"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { GitHubCalendar } from "react-github-calendar";

export const Projects = forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <div className=" flex-col flex items-center justify-center" ref={ref}>
      <h2 className="text-7xl font-black">Projects</h2>
      <button>
        <p className="text-5xl font-bold">MESAConnect</p>
      </button>
      <button>
        <p className="text-5xl font-bold">MESAMobile</p>
      </button>
    </div>
  );
});

Projects.displayName = "Projects";
