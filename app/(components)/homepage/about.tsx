"use client";
import React, { useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiFirebase,
  SiSupabase,
  SiPostgresql,
  SiUnity,
  SiApple,
  SiLinux,
} from "react-icons/si";
import { FaJava, FaWindows } from "react-icons/fa";
import Globe from "./globe";
import LAACImage from "../../(assets)/images/LAAC.jpg";
import Image from "next/image";

export const Skillset = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++"],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "React Native",
    "TailwindCSS",
  ],
  tools: [
    "Firebase",
    "Supabase",
    "PostgreSQL",
    "Unity",
    "Windows",
    "macOS",
    "Linux",
  ],
};

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Python: SiPython,
    Java: FaJava,
    C: SiC,
    "C++": SiCplusplus,
    React: SiReact,
    "Next.js": SiNextdotjs,
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    "React Native": SiReact,
    TailwindCSS: SiTailwindcss,
    Firebase: SiFirebase,
    Supabase: SiSupabase,
    PostgreSQL: SiPostgresql,
    Unity: SiUnity,
    Windows: FaWindows,
    macOS: SiApple,
    Linux: SiLinux,
  };

const About = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
        About Me
      </h1>
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border-2 border-black bg-gray-100 dark:border-white dark:bg-gray-950">
            <div className="relative min-h-56 w-full flex-1 sm:min-h-64 lg:min-h-72">
              <Image
                src={LAACImage}
                alt="Joshua Rashtian speaking at an event"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </article>
          <article className="flex h-full flex-col justify-center rounded-lg border-2 border-black bg-gray-100 p-5 sm:p-8 dark:border-white dark:bg-gray-950">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 wrap-break-word">
              Joshua Rashtian
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 wrap-break-word">
              Computer Science Student at California Polytechnic State
              University, San Luis Obispo.
            </p>
          </article>
        </div>

        <article className="overflow-hidden rounded-lg border-2 border-black bg-gray-100 dark:border-white dark:bg-zinc-950">
          <div className="relative p-4 sm:p-6">
            <ol className="absolute right-3 top-3 z-10 flex w-[120px] cursor-pointer flex-col gap-2 rounded px-2 py-1 text-right font-mono text-xs transition-all duration-300 hover:w-40 hover:bg-gray-200 group dark:hover:bg-gray-800 sm:text-sm">
              <li className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-800 group-hover:dark:bg-gray-600">
                {selectedLanguage}
              </li>
              {["C++", "Java", "TypeScript"].map((language) => {
                const Icon = iconMap[language];
                return (
                  <li
                    key={language}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded px-2 py-1 opacity-0 transition-all duration-300 group-hover:bg-gray-200 group-hover:opacity-100 dark:group-hover:bg-gray-800"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                    )}
                    <span className="max-w-[120px] truncate whitespace-nowrap sm:max-w-none">
                      {language}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="max-w-full space-y-1 overflow-x-auto pr-24 font-mono text-xs sm:space-y-2 sm:pr-28 sm:text-sm lg:text-base">
              {selectedLanguage === "C++" && (
                <>
                  <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">int</span>{" "}
                    years_of_experience =
                    <span className="text-orange-500"> 4</span>;
                  </pre>
                  <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">int[]</span>{" "}
                    location_coordinates = {`{34.05, -118.25}`};
                  </pre>
                  <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">string</span> location ={" "}
                    <span className="text-green-700">
                      &quot;Los Angeles, CA&quot;
                    </span>
                    ;
                  </pre>
                </>
              )}
              {selectedLanguage === "Java" && (
                <>
                  <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    <span className="text-orange-500">public class</span>{" "}
                    <span className="text-teal-700">Details</span>{" "}
                    <span className="text-orange-500">
                      extends About Me {`{`}
                    </span>
                  </pre>
                  <pre className="overflow-x-auto ml-4 whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">private int</span>{" "}
                    years_of_experience =
                    <span className="text-orange-500"> 4</span>;
                  </pre>

                  <pre className="overflow-x-auto ml-4 whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">private int[]</span>{" "}
                    location_coordinates = {`[34.05, -118.25]`};
                  </pre>
                  <pre className="overflow-x-auto ml-4      whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">private String</span>{" "}
                    location ={" "}
                    <span className="text-green-700">
                      &quot;Los Angeles, CA&quot;
                    </span>
                    ;
                  </pre>
                  <pre className="overflow-x-auto  whitespace-pre-wrap text-orange-500 wrap-break-word">{`}`}</pre>
                </>
              )}
              {selectedLanguage === "TypeScript" && (
                <>
                  <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
                    <span className="text-blue-500">export const</span>{" "}
                    <span className="text-teal-700">Details</span>{" "}
                    <span className="text-orange-500">= {`{`}</span>
                  </pre>
                  <pre className="overflow-x-auto ml-4 whitespace-pre-wrap wrap-break-word">
                    <span className="text-white">years_of_experience:</span>{" "}
                    <span className="text-orange-500">4</span>,
                  </pre>
                  <pre className="overflow-x-auto ml-4 whitespace-pre-wrap wrap-break-word">
                    <span className="text-white">location_coordinates:</span>{" "}
                    <span className="text-orange-500">[34.05, -118.25]</span>,
                  </pre>
                  <pre className="overflow-x-auto ml-4 whitespace-pre-wrap wrap-break-word">
                    <span className="text-white">location:</span>{" "}
                    <span className="text-green-700">
                      &quot;Los Angeles, CA&quot;
                    </span>
                    ,
                  </pre>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-orange-500 wrap-break-word">{`}`}</pre>
                </>
              )}
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-lg border-2 border-black bg-gray-100 dark:border-white dark:bg-gray-950">
          <div className="p-3 sm:p-4">
            <h2 className="mb-2 text-center text-lg font-bold sm:mb-3 sm:text-xl lg:text-2xl">
              Los Angeles, CA
            </h2>
            <div className="flex w-full items-center justify-center py-1 sm:py-2">
              <Globe />
            </div>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg border-2 border-black bg-gray-100 dark:border-white dark:bg-gray-950">
          <div className="p-4 sm:p-6">
            <h2 className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl lg:text-3xl">
              Skillset
            </h2>
            <ol className="flex flex-col gap-3 sm:gap-4">
              <li className="text-base sm:text-lg font-bold">Languages</li>
              <ol className="flex flex-row flex-wrap gap-2 sm:gap-3 max-w-full">
                {Skillset.languages.map((language) => {
                  const Icon = iconMap[language];
                  return (
                    <li
                      key={language}
                      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-xs sm:text-sm max-w-full"
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      )}
                      <span className="whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
                        {language}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <li className="text-base sm:text-lg font-bold mt-2">
                Frameworks
              </li>
              <ol className="flex flex-row flex-wrap gap-2 sm:gap-3 max-w-full">
                {Skillset.frameworks.map((framework) => {
                  const Icon = iconMap[framework];
                  return (
                    <li
                      key={framework}
                      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-xs sm:text-sm max-w-full"
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      )}
                      <span className="whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
                        {framework}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <li className="text-base sm:text-lg font-bold mt-2">Tools</li>
              <ol className="flex flex-row flex-wrap gap-2 sm:gap-3 max-w-full">
                {Skillset.tools.map((tool) => {
                  const Icon = iconMap[tool];
                  return (
                    <li
                      key={tool}
                      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-xs sm:text-sm max-w-full"
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      )}
                      <span className="whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
                        {tool}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </ol>
          </div>
        </article>
      </div>
    </div>
  );
};

export default About;
