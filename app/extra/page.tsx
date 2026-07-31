"use client"
import { motion } from "framer-motion";

export default function BonusFeaturesPage() {
  return (
    <motion.div
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: "#f97316" }} // orange-500
      transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
      className="h-screen  w-screen flex items-end justify-start p-4"
    >
    <motion.h1 initial={{ y: 100 }} animate={{ y: 1 }} transition={{ duration: 2, delay: 1}} className="font-climate-crisis text-white text-4xl">Bonus Features</motion.h1>
    </motion.div>
  );
}
