"use client";
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
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
    <div className="w-full p-4 sm:p-6 lg:p-8 ">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
        About Me
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 w-full min-h-[600px] lg:h-[900px] gap-4 sm:gap-6 ">
        <div className="h-full relative lg:row-span-1 lg:col-span-1 w-full min-h-[200px] lg:min-h-0 overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-950 border-2 dark:border-white rounded-lg h-full p-4 sm:p-6 flex flex-col justify-center overflow-hidden">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 wrap-break-word">
              Joshua Rashtian
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 wrap-break-word">
              Computer Engineering Student at College of the Canyons.
            </p>
          </div>
        </div>

        <div className="h-full w-full lg:col-span-3 lg:row-span-1 min-h-[150px] lg:min-h-0 overflow-hidden">
          <div className="bg-gray-100 dark:border-white border-2 relative dark:bg-zinc-950 rounded-lg h-full p-4 sm:p-6 overflow-hidden">
            <ol className="absolute hover:bg-gray-200 group w-[120px] hover:w-40 text-right dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer top-3 flex flex-col gap-2 right-3 text-xs sm:text-sm font-mono  px-2 py-1 rounded z-10">
              <li className="bg-gray-200 dark:bg-gray-800 group-hover:dark:bg-gray-600 px-2 py-1 rounded z-10">
                {selectedLanguage}
              </li>
              {["C++", "Java", "TypeScript"].map((language) => {
                const Icon = iconMap[language];
                return (
                  <li
                    key={language}
                    className="flex flex-row gap-2 group-hover:opacity-100 opacity-0 items-center cursor-pointer group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-all duration-300 px-2 py-1 rounded z-10"
                    onClick={() => setSelectedLanguage(language)}
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

            <div className="font-mono text-xs sm:text-sm lg:text-base mt-6 sm:mt-4 space-y-1 sm:space-y-2 overflow-x-auto max-w-full">
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
        </div>

        <div className="h-full w-full lg:col-span-4 lg:row-span-2 min-h-[400px] lg:min-h-0 overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-950 border-2 dark:border-white rounded-lg h-full p-4 sm:p-6  overflow-x-hidden">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6">
              Skillset
            </h1>
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
        </div>
      </div>
    </div>
  );
};

export default About;
