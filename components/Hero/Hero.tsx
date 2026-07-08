"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PromptBox from "../PromptBox/PromptBox";
import WallpaperPreview from "../WallpaperPreview/WallpaperPreview";
import StyleChips from "../StyleChips/StyleChips";
import AspectRatioSelector, {
  AspectRatio,
} from "../AspectRatioSelector/AspectRatioSelector";
import RecentWallpapers from "../RecentWallpapers/RecentWallpapers";

import {
  getHistory,
  saveWallpaper,
  WallpaperItem,
} from "@/lib/storage";

export default function Hero() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>("phone");

  const [history, setHistory] =
    useState<WallpaperItem[]>([]);

  const generateWallpaper = async (prompt: string) => {
    try {
      setLoading(true);

      const finalPrompt = selectedStyle
        ? `${prompt}, ${selectedStyle} style, ultra detailed, masterpiece, 8k wallpaper`
        : prompt;

      let width = 1024;
      let height = 1792;

      switch (aspectRatio) {
        case "desktop":
          width = 1792;
          height = 1024;
          break;

        case "square":
          width = 1024;
          height = 1024;
          break;

        default:
          width = 1024;
          height = 1792;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          width,
          height,
        }),
      });

      if (!response.ok) {
        let message = "Failed to generate wallpaper.";

        try {
          const error = await response.json();
          message = error.error || message;
        } catch {}

        throw new Error(message);
      }

      const blob = await response.blob();

      if (image) {
        URL.revokeObjectURL(image);
      }

      const url = URL.createObjectURL(blob);

      setImage(url);

      const wallpaper: WallpaperItem = {
        id: crypto.randomUUID(),
        prompt: finalPrompt,
        image: url,
        createdAt: new Date().toISOString(),
      };

      saveWallpaper(wallpaper);
      setHistory(getHistory());

      toast.success("Wallpaper generated!");
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the wallpaper."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHistory(getHistory());

    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 py-20 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-900/40 via-black to-purple-900/40" />

      <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />

      <div
        className="absolute right-0 top-32 -z-10 h-[450px] w-[450px] animate-pulse rounded-full bg-cyan-500/20 blur-[120px]"
        style={{ animationDelay: "1.5s" }}
      />

      <div
        className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] animate-pulse rounded-full bg-pink-500/20 blur-[120px]"
        style={{ animationDelay: "3s" }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        {/* Heading */}
        <div className="max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-6xl font-black leading-tight text-transparent md:text-8xl">
            Create Stunning
            <br />
            AI Wallpapers
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg leading-8 text-gray-300 md:text-xl">
            Generate breathtaking wallpapers using
            <span className="font-semibold text-violet-300">
              {" "}Gemini AI{" "}
            </span>
            for prompt enhancement and
            <span className="font-semibold text-cyan-300">
              {" "}Cloudflare Workers AI
            </span>
            for lightning-fast image generation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              Gemini AI
            </span>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Cloudflare AI
            </span>

            <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
              FLUX
            </span>

            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
              Free
            </span>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <PromptBox
            prompt={prompt}
            setPrompt={setPrompt}
            loading={loading}
            onGenerate={generateWallpaper}
          />

          <StyleChips
            selected={selectedStyle}
            onSelect={setSelectedStyle}
          />

          <AspectRatioSelector
            selected={aspectRatio}
            onSelect={setAspectRatio}
          />
        </div>

        {/* Preview */}
        <WallpaperPreview
          image={image}
          loading={loading}
        />

        {/* Recent Wallpapers */}
        <RecentWallpapers
          history={history}
          onSelect={(item) => {
            setPrompt(item.prompt);
            setImage(item.image);
          }}
        />
      </div>
    </section>
  );
}