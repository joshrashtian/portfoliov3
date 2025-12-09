"use client";

import Link from "next/link";
import { forwardRef } from "react";

export const Projects = forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <div
      className="h-screen flex-col flex items-center justify-center"
      ref={ref}
    >
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
