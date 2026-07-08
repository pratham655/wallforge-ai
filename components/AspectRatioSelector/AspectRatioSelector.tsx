"use client";

import clsx from "clsx";
import { Smartphone, Monitor, Square } from "lucide-react";
import { motion } from "framer-motion";

export type AspectRatio = "phone" | "desktop" | "square";

interface Props {
  selected: AspectRatio;
  onSelect: (ratio: AspectRatio) => void;
}

const options = [
  {
    id: "phone",
    label: "Phone",
    icon: Smartphone,
  },
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
  },
  {
    id: "square",
    label: "Square",
    icon: Square,
  },
] as const;

export default function AspectRatioSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-semibold text-gray-400">
        Wallpaper Size
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {options.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                "rounded-2xl border p-4 transition-all",
                selected === item.id
                  ? "border-violet-500 bg-violet-600 text-white shadow-xl shadow-violet-600/30"
                  : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
              )}
            >
              <Icon className="mx-auto mb-2 h-6 w-6" />

              <p className="text-sm font-semibold">
                {item.label}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}