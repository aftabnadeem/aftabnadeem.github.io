"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";
import './globals.css';

export default function Home() {
  return (
    <main className="px-6 max-w-7xl mx-auto">

      {/* ================= HOME ================= */}
      <section id="home" className="md:min-h-screen flex flex-col md:flex-row items-center md:justify-between mt-10 glass p-6 lg:p-10 rounded-2xl">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm <span className="text-[#6C63FF]">Aftab</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-lg">
            Full Stack Developer specializing in Django, DRF, Next.js, Node.js, React, React Native and scalable backend engineering.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-[#6C63FF] hover:bg-[#564fe3] transition">View Projects</a>
            <a href="#contact" className="px-6 py-3 rounded-xl bg-[#00E5FF] text-black font-semibold hover:bg-[#00c6db] transition">Contact</a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 md:mt-0">
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#6C63FF] shadow-[0_0_30px_#6C63FF]">
              <Image src="/profile.jpg" width={350} height={350} alt="Profile" className="object-cover" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24">
        <FadeIn>
          <h1 className="text-5xl font-bold text-[#6C63FF] mb-6">About Me</h1>
          <p className="text-gray-300 max-w-3xl">
            I'm a Full Stack Developer based in Bengaluru with expertise in Python Django, DRF, Node.js, React, React Native, PostgreSQL, MongoDB and modern cloud-based SaaS development.
          </p>
        </FadeIn>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-24">
        <FadeIn>
          <h1 className="text-5xl font-bold text-[#6C63FF] mb-12 text-center">My Tech Stack</h1>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Next.js","React","Django","DRF","Node.js","PostgreSQL","MongoDB","React Native","Expo","Docker","Git"]
            .map((skill, i) => (
            <FadeIn key={skill} delay={i * 0.05}>
              <div className="glass p-6 rounded-xl text-center text-xl neon-hover">
                {skill}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-24">
        <FadeIn>
          <h1 className="text-5xl font-bold text-[#6C63FF] mb-12 text-center">Projects</h1>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Flowventory – Inventory SaaS",
              desc: "Real-time stock tracking, barcodes, analytics."
            },
            {
              title: "AI Student Chatbot Backend",
              desc: "Handles text/image questions + credit system."
            },
            {
              title: "Employee Monitoring System",
              desc: "Activity logs, productivity tracking."
            }
          ].map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="glass p-6 rounded-xl neon-hover">
                <h2 className="text-2xl font-semibold mb-2">{p.title}</h2>
                <p className="text-gray-300">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24">
        <FadeIn>
          <h1 className="text-5xl font-bold text-[#6C63FF] mb-6 text-center">Contact Me</h1>

          <div className="glass max-w-lg mx-auto p-10 rounded-2xl">
            <form className="space-y-5">
              <input className="w-full p-3 rounded-xl bg-white/10 border border-white/20" placeholder="Your Name" />
              <input className="w-full p-3 rounded-xl bg-white/10 border border-white/20" placeholder="Your Email" />
              <textarea rows="4" className="w-full p-3 rounded-xl bg-white/10 border border-white/20" placeholder="Message"></textarea>
              <button className="w-full p-3 bg-[#6C63FF] rounded-xl hover:bg-[#564fe3] transition">Send Message</button>
            </form>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
