export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl font-bold leading-tight">
        Create Stunning AI Wallpapers
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        Turn your imagination into beautiful wallpapers using AI.
        Simply describe your idea, choose a style, and let WallForge AI
        generate a unique wallpaper in seconds.
      </p>

      <button className="mt-10 rounded-xl bg-black px-8 py-4 text-white text-lg font-semibold transition hover:scale-105">
        Generate Wallpaper
      </button>

    </section>
  );
}