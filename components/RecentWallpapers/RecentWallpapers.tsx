"use client";

import { WallpaperItem } from "../../lib/storage";
import { motion } from "framer-motion";

interface Props {
  history: WallpaperItem[];
  onSelect: (item: WallpaperItem) => void;
}

export default function RecentWallpapers({
  history,
  onSelect,
}: Props) {
  if (history.length === 0) return null;

  return (
    <section className="mt-16 w-full max-w-6xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Recent Wallpapers
        </h2>

        <p className="text-sm text-gray-400">
          {history.length} saved
        </p>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {history.map((wallpaper) => (
          <motion.div
            whileHover={{ y: -6 }}
            key={wallpaper.id}
            onClick={() => onSelect(wallpaper)}
            className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <img
              src={wallpaper.image}
              alt={wallpaper.prompt}
              className="aspect-[9/16] w-full object-cover"
            />

            <div className="p-4">

              <p className="line-clamp-2 text-sm text-white">
                {wallpaper.prompt}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {new Date(
                  wallpaper.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}