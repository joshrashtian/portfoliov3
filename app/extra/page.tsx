"use client";

import { ContactShadows, PresentationControls } from "@react-three/drei";
import { motion } from "framer-motion";

import OldTV from "../(components)/three/OldTV";
import Scene from "../(components)/three/Scene";

export default function BonusFeaturesPage() {
  return (
    <motion.div
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: "#f97316" }} // orange-500
      transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
      className="relative h-screen w-screen overflow-hidden"
    >
      <Scene
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 0.05, 3.1], fov: 35 }}
        shadows
      >
        <ambientLight intensity={0.85} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#ffd9a8" />

        <PresentationControls
          global
          cursor
          snap
          polar={[-0.15, 0.15]}
          azimuth={[-0.35, 0.35]}
        >
          <OldTV position={[0, 0.18, 0]} />
        </PresentationControls>

        <ContactShadows
          position={[0, -0.78, 0]}
          opacity={0.5}
          scale={4}
          blur={2.4}
          far={1.2}
        />
      </Scene>

      <motion.h1
        initial={{ y: 100 }}
        animate={{ y: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="pointer-events-none absolute bottom-4 left-4 font-climate-crisis text-4xl text-white"
      >
        Bonus Features
      </motion.h1>
    </motion.div>
  );
}
