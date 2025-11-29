"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen px-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto glass p-10 rounded-2xl mt-10">
      
      {/* LEFT TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 text-center md:text-left"
      >
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Hi, I'm <span className="text-[#6C63FF]">Aftab</span>
        </h1>

        <p className="text-lg text-gray-300 mt-4 max-w-xl">
          Full Stack Developer specializing in Python Django, DRF, Node.js,
          React, React Native, PostgreSQL, MongoDB, and scalable backend systems.
        </p>

        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <a
            href="/projects"
            className="px-6 py-3 rounded-xl bg-[#6C63FF] hover:bg-[#574fe3] transition"
          >
            View Projects
          </a>

          <a
            href="/contact"
            className="px-6 py-3 rounded-xl bg-[#00E5FF] text-black font-semibold hover:bg-[#00cfe0] transition"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex-1 flex justify-center mt-10 md:mt-0"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#6C63FF] shadow-2xl shadow-purple-500/40">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={350}
            height={350}
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
