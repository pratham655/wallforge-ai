"use client";

import { KeyboardEvent, useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import toast from "react-hot-toast";

interface PromptBoxProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onGenerate: (prompt: string) => Promise<void>;
  loading: boolean;
}

const MAX_LENGTH = 500;

export default function PromptBox({
  prompt,
  setPrompt,
  onGenerate,
  loading,
}: PromptBoxProps) {
  const [enhancing, setEnhancing] = useState(false);

  const generate = async () => {
    const text = prompt.trim();

    if (!text || loading) return;

    await onGenerate(text);
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) return;

    try {
      setEnhancing(true);

      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance prompt.");
      }

      const data = await response.json();

      if (data.prompt) {
        setPrompt(data.prompt);
        toast.success("Prompt enhanced!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance prompt.");
    } finally {
      setEnhancing(false);
    }
  };

  const handleKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      await generate();
    }
  };

  return (
    <div className="w-full">
      <textarea
        rows={6}
        value={prompt}
        maxLength={MAX_LENGTH}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your dream wallpaper..."
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-white placeholder:text-gray-500 outline-none transition focus:border-violet-500"
      />

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {prompt.length}/{MAX_LENGTH}
        </span>

        <span className="hidden text-xs text-gray-500 md:block">
          Ctrl + Enter
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <button
          onClick={enhancePrompt}
          disabled={
            enhancing ||
            loading ||
            prompt.trim().length === 0
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-6 py-4 font-semibold text-violet-300 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {enhancing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              Enhance Prompt
            </>
          )}
        </button>

        <button
          onClick={generate}
          disabled={
            loading ||
            enhancing ||
            prompt.trim().length === 0
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-600/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Wallpaper
            </>
          )}
        </button>
      </div>
    </div>
  );
}