"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">

        {/* Left */}
        <div>
          <h2 className="text-lg font-bold text-white">
            WallForge AI
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Create stunning AI wallpapers with Gemini & Cloudflare Workers AI.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>Next.js 15</span>
          <span>•</span>
          <span>Gemini AI</span>
          <span>•</span>
          <span>Cloudflare AI</span>
        </div>

        {/* Right */}
        <a
          href="https://github.com/pratham655"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          GitHub
        </a>

      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
        Made with <Heart className="mx-1 inline h-4 w-4 text-red-500" />
        by Pratham
      </div>
    </footer>
  );
}