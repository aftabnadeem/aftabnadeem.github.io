"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <h1 className="text-5xl font-bold text-[#6C63FF] mb-4 text-center">
        Get in Touch
      </h1>

      <p className="text-gray-400 max-w-xl text-center mb-10">
        Have a project in mind, want to hire me, or just want to say hello?  
        Feel free to drop a message!
      </p>

      <div className="glass p-10 rounded-2xl max-w-lg w-full shadow-xl">
        <form className="space-y-5">

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#6C63FF] outline-none"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#6C63FF] outline-none"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Message</label>
            <textarea
              rows="4"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#6C63FF] outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 rounded-xl bg-[#6C63FF] hover:bg-[#564FE3] transition font-semibold"
          >
            Send Message
          </motion.button>

        </form>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex gap-6 text-3xl">
        <motion.a
          href="https://github.com/aftabnadeem"
          whileHover={{ scale: 1.2 }}
          className="hover:text-[#00E5FF]"
        >
          <i className="ri-github-fill"></i>
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/aftab-nadeem-b42772256/"
          whileHover={{ scale: 1.2 }}
          className="hover:text-[#00E5FF]"
        >
          <i className="ri-linkedin-box-fill"></i>
        </motion.a>

        <motion.a
          href="mailto:aftabnadeemnp@gmail.com"
          whileHover={{ scale: 1.2 }}
          className="hover:text-[#00E5FF]"
        >
          <i className="ri-mail-line"></i>
        </motion.a>
      </div>
    </motion.section>
  );
}
