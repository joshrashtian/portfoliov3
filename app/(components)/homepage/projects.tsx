"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import MESAConnectImage from "../../(assets)/images/projects/mesaconnectproject.png";
import Image from "next/image";
import {
  IoGitBranch,
  IoGlobe,
  IoLogoApple,
  IoLogoCss3,
  IoLogoReact,
} from "react-icons/io5";
import MESAMobileImage1 from "../../(assets)/images/projects/mesamobile1.png";
import MESAMobileImage2 from "../../(assets)/images/projects/mesamobile2.png";

export const Projects = forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <div
      className=" flex-col flex p-5 items-center justify-center gap-5"
      ref={ref}
    >
      <h2 className="text-6xl font-black text-left w-full">Projects</h2>
      <button className="flex relative group overflow-hidden w-full xl:flex-row h-[480px] duration-500 xl:h-72  p-5 bg-zinc-100 dark:bg-zinc-900 rounded-lg gap-2 items-center justify-center">
        <Image
          src={MESAConnectImage}
          alt="MESAConnect"
          width={500}
          height={100}
          className="absolute left-0  translate-y-32 xl:translate-y-16 rotate-4 group-hover:rotate-6 group-hover:scale-[1.02] duration-500"
        />
        <div className="absolute right-10 top-8 xl:top-0 xl:h-full flex-col flex gap-2 justify-center  items-end z-10">
          <p className="text-5xl font-semibold text-center">MESAConnect</p>
          <p className="text-lg text-gray-500 text-center">
            Social Media Platform for College of the Canyons MESA.
          </p>
          <div className="flex flex-row gap-3 items-center">
            <IoLogoReact className="w-8 h-8 text-blue-500" />
            {/* Next.js */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z"
                fill="#000000"
              />
            </svg>
            {/* Supabase */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 109 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                fill="url(#paint0_linear_supabase)"
              />
              <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                fill="url(#paint1_linear_supabase)"
                fillOpacity="0.2"
              />
              <path
                d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                fill="#3ECF8E"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_supabase"
                  x1="53.9738"
                  y1="54.974"
                  x2="94.1635"
                  y2="71.8295"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#249361" />
                  <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_supabase"
                  x1="36.1558"
                  y1="30.578"
                  x2="54.4844"
                  y2="65.0806"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Tailwind CSS */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
              className="w-8 h-8"
            >
              <g clipPath="url(#prefix__clip0_tailwind)">
                <path
                  fill="#38bdf8"
                  fillRule="evenodd"
                  d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                  clipRule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="prefix__clip0_tailwind">
                  <path fill="#fff" d="M0 0h54v32.4H0z" />
                </clipPath>
              </defs>
            </svg>
            {/* TypeScript */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="TypeScript"
              role="img"
              viewBox="0 0 512 512"
              className="w-8 h-8"
            >
              <rect width="512" height="512" rx="15%" fill="#3178c6" />
              <path
                fill="#ffffff"
                d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
              />
            </svg>
            {/* Framer Motion */}
            <svg
              height="32"
              viewBox="3.7 3.7 43.6 43.6"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="m47.3 3.7v21.8l-10.9 10.9-10.9 10.9-10.9-10.9 10.9-10.9v.1-.1z"
                fill="#59529d"
              />
              <path d="m47.3 25.5v21.8l-10.9-10.9z" fill="#5271b4" />
              <path
                d="m25.5 25.5-10.9 10.9-10.9 10.9v-43.6l10.9 10.9z"
                fill="#bb4b96"
              />
            </svg>
            <IoLogoCss3 className="w-8 h-8 text-purple-500" />
          </div>
          <ol className="flex flex-row gap-2 font-mono">
            <Link
              href="https://mesaconnect.io"
              target="_blank"
              className="bg-orange-400 text-white px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center"
            >
              <IoGlobe />
              View Project
            </Link>
            <Link
              href="https://github.com/joshrashtian/mesaconnect2.0"
              target="_blank"
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center"
            >
              <IoGitBranch /> Source Code
            </Link>
          </ol>
        </div>
      </button>
      <button className="flex relative group overflow-hidden w-full xl:flex-row h-[480px] duration-500 xl:h-84  p-5 bg-zinc-100 dark:bg-zinc-900 rounded-lg gap-2 items-center justify-center">
        <Image
          src={MESAMobileImage1}
          alt="MESAMobile1"
          width={300}
          height={100}
          className="absolute right-28 translate-y-32 xl:translate-y-52  rotate-4 group-hover:rotate-6 group-hover:scale-[1.02] duration-500"
        />
        <Image
          src={MESAMobileImage2}
          alt="MESAMobile2"
          width={300}
          height={100}
          className="absolute right-6 xl:right-0 translate-y-16 xl:translate-y-24 translate-x-6 xl:translate-x-0 rotate-6 group-hover:rotate-6 group-hover:scale-[1.02] duration-500"
        />
        <div className="absolute left-10 top-8 xl:top-0 xl:h-full flex-col flex gap-2 justify-center  items-start z-10">
          <p className="text-5xl font-semibold text-center">MESAMobile</p>
          <p className="text-lg text-gray-500 text-center">
            Access your MESA Experience on the go. Connect to your college.
          </p>
          <div className="flex flex-row gap-3 items-center">
            {/* Expo */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M24.292 15.547c1.968 0.131 3.729-1.213 4.115-3.145-0.475-0.735-1.287-1.177-2.161-1.177-2.272-0.052-3.491 2.651-1.953 4.323zM15.115 4.697l5.359-3.104-1.708-0.963-7.391 4.281 0.589 0.328 1.119 0.629 2.032-1.176zM21.161 1.307c0.089 0.027 0.161 0.1 0.188 0.188l2.484 7.593c0.047 0.131-0.005 0.272-0.125 0.344-1.968 1.156-2.916 3.489-2.317 5.693 0.656 2.391 2.937 3.953 5.401 3.703 0.135-0.011 0.265 0.073 0.307 0.203l2.563 7.803c0.041 0.131-0.011 0.271-0.125 0.344l-7.859 4.771c-0.037 0.021-0.084 0.036-0.131 0.036-0.068 0.016-0.14 0-0.203-0.041l-2.765-1.797c-0.048-0.031-0.084-0.077-0.109-0.129l-5.396-12.896-8.219 4.875c-0.016 0.011-0.037 0.021-0.052 0.032-0.084 0.036-0.183 0.025-0.261-0.021l-1.859-1.093c-0.136-0.073-0.188-0.245-0.115-0.381l7.953-15.749c0.025-0.057 0.077-0.104 0.135-0.131l7.959-4.609c0.088-0.052 0.197-0.057 0.292-0.005zM12.839 6.407l-1.932-1.089-7.693 15.229 1.396 0.823 6.631-9.015c0.063-0.089 0.167-0.136 0.271-0.12 0.104 0.011 0.192 0.077 0.235 0.177l7.228 17.296 1.933 1.251-8.063-24.552zM26.245 16.964c-2.256 0-3.787-2.292-2.923-4.376 0.86-2.083 3.563-2.619 5.156-1.025 0.595 0.593 0.928 1.396 0.928 2.235 0.005 1.749-1.412 3.167-3.161 3.167z"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              />
            </svg>
            <IoLogoReact className="w-8 h-8 text-blue-500" />
            {/* Supabase */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 109 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                fill="url(#paint0_linear_supabase_mobile)"
              />
              <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                fill="url(#paint1_linear_supabase_mobile)"
                fillOpacity="0.2"
              />
              <path
                d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                fill="#3ECF8E"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_supabase_mobile"
                  x1="53.9738"
                  y1="54.974"
                  x2="94.1635"
                  y2="71.8295"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#249361" />
                  <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_supabase_mobile"
                  x1="36.1558"
                  y1="30.578"
                  x2="54.4844"
                  y2="65.0806"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* TypeScript */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="TypeScript"
              role="img"
              viewBox="0 0 512 512"
              className="w-8 h-8"
            >
              <rect width="512" height="512" rx="15%" fill="#3178c6" />
              <path
                fill="#ffffff"
                d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
              />
            </svg>
          </div>
          <ol className="flex flex-row gap-2 font-mono">
            <Link
              href="https://apps.apple.com/us/app/mesamobile/id6504261825"
              target="_blank"
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center"
            >
              <IoLogoApple />
              App Store
            </Link>
          </ol>
        </div>
      </button>
    </div>
  );
});

Projects.displayName = "Projects";
