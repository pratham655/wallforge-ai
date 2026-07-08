"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-4 shadow-2xl backdrop-blur-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-lg shadow-violet-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">
              WallForge AI
            </h1>

            <p className="text-xs text-gray-400">
              Powered by Gemini + Cloudflare
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#history"
            className="text-gray-300 transition hover:text-white"
          >
            History
          </a>

          <a
            href="#generator"
            className="text-gray-300 transition hover:text-white"
          >
            Generator
          </a>
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com/pratham655"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          GitHub
        </a>
      </div>
    </motion.header>
  );
}