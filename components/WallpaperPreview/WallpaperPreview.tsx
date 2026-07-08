"use client";

import {
  Download,
  ExternalLink,
  Heart,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface WallpaperPreviewProps {
  image: string | null;
  loading: boolean;
}

export default function WallpaperPreview({
  image,
  loading,
}: WallpaperPreviewProps) {
  const downloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = `wallforge-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 flex w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col items-center gap-5">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />

          <div className="text-center">

            <h3 className="font-semibold text-white">
              Creating your masterpiece...
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Gemini is enhancing your prompt
            </p>

          </div>

        </div>
      </motion.div>
    );
  }

  if (!image) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 flex w-full max-w-md flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-14 text-center backdrop-blur-xl"
      >
        <Sparkles className="mb-5 h-16 w-16 text-violet-400" />

        <h2 className="text-xl font-bold text-white">
          Ready to Create
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-400">
          Describe your dream wallpaper and let AI transform
          your imagination into stunning artwork.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
    >
      <img
        src={image}
        alt="Generated Wallpaper"
        className="aspect-[9/16] w-full object-cover transition duration-500 hover:scale-[1.03]"
      />

      <div className="border-t border-white/10 p-5">

        <h3 className="mb-4 text-lg font-bold text-white">
          Wallpaper Ready
        </h3>

        <div className="grid grid-cols-3 gap-3">

          <button
            className="flex items-center justify-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/10 py-3 text-pink-300 transition hover:bg-pink-500/20"
          >
            <Heart size={18} />
          </button>

          <button
            onClick={downloadImage}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition hover:scale-[1.03]"
          >
            <Download size={18} />
          </button>

          <a
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-3 text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <ExternalLink size={18} />
          </a>

        </div>

      </div>
    </motion.div>
  );
}