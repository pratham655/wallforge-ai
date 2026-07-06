export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold">
        🎨 WallForge AI
      </h1>

      <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
        Login
      </button>
    </nav>
  );
}