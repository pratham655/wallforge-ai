import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WallForge AI | AI Wallpaper Generator",
  description:
    "Generate stunning AI wallpapers using Gemini AI and Cloudflare Workers AI. Create cinematic, high-quality wallpapers with AI-powered prompt enhancement and FLUX image generation.",
  keywords: [
    "AI Wallpaper",
    "WallForge AI",
    "Gemini AI",
    "Cloudflare Workers AI",
    "FLUX",
    "Next.js",
    "AI Image Generator",
    "Wallpaper Generator",
  ],
  authors: [
    {
      name: "Pratham",
    },
  ],
  creator: "Pratham",
  applicationName: "WallForge AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-black text-white">

        {children}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#111827",
              color: "#ffffff",
              border: "1px solid #374151",
              borderRadius: "12px",
              padding: "14px 18px",
            },
          }}
        />

      </body>
    </html>
  );
}