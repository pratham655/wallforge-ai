"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

const styles = [
  "Anime",
  "Cyberpunk",
  "Fantasy",
  "Realistic",
  "Neon",
  "Ghibli",
  "Space",
  "Minimal",
];

interface StyleChipsProps {
  selected: string;
  onSelect: (style: string) => void;
}

export default function StyleChips({
  selected,
  onSelect,
}: StyleChipsProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-gray-400">
        Choose Style
      </h3>

      <div className="flex flex-wrap gap-3">
        {styles.map((style) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={style}
            onClick={() => onSelect(style)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
              selected === style
                ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-violet-400 hover:bg-white/10"
            )}
          >
            {style}
          </motion.button>
        ))}
      </div>
    </div>
  );
}