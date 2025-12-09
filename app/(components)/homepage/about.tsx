"use client";
import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";
import PurpleCard from "../../(assets)/images/front_page/PurpleCard.png";

const About = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">About Me</h1>
      <div className="grid grid-cols-4 grid-rows-3 w-full h-96 gap-4">
        <Tilt
          tiltAngleXInitial={0}
          tiltAngleYInitial={0}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          className="h-full relative row-span-3 col-span-2 w-full" // <-- THIS IS IMPORTANT
        >
          <div className="col-span-1 row-span-1 bg-gray-100 dark:bg-gray-950 border-2 dark:border-white rounded-lg h-full p-4">
            <h4 className="text-xl font-bold">Joshua Rashtian</h4>
            <p>Computer Engineering Student at College of the Canyons.</p>
          </div>
        </Tilt>

        <Tilt
          tiltAngleXInitial={0}
          tiltAngleYInitial={0}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          className="h-full w-full col-span-2 row-span-1"
        >
          <div className=" bg-gray-100 dark:border-white border-2 relative dark:bg-zinc-950 rounded-lg  h-full p-4">
            <p className=" absolute top-3 right-3">C++</p>
            <pre>
              <span className="text-blue-500">int</span> years_of_experience =
              <span className="text-orange-500"> 4</span>;
            </pre>
            <pre>
              <span className="text-blue-500">int[]</span> location_coordinates
              = {`{34.05, -118.25}`};
            </pre>
            <pre>
              <span className="text-blue-500">string</span> location ={" "}
              <span className="text-green-700">
                &quot;Los Angeles, CA&quot;
              </span>
              ;
            </pre>
          </div>
        </Tilt>

        <Tilt
          tiltAngleXInitial={0}
          tiltAngleYInitial={0}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          className="h-full w-full"
        >
          <div className="col-span-1 bg-gray-100 dark:bg-gray-950 border-2 dark:border-white rounded-lg h-full p-4"></div>
        </Tilt>
      </div>
    </div>
  );
};

export default About;
