"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const items = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 glass px-8 py-4 flex justify-between items-center"
      >
        <span className="text-2xl font-bold text-[#6C63FF]">Aftab.dev</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {items.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-[#00E5FF] transition">
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile button */}
        <button className="text-3xl md:hidden" onClick={() => setOpen(true)}>
          ☰
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-2/3 h-full z-50 glass p-8"
          >
            <button className="text-3xl mb-6" onClick={() => setOpen(false)}>
              ✕
            </button>

            <div className="flex flex-col gap-6 text-xl">
              {items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#00E5FF]"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
