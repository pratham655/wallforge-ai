export interface WallpaperItem {
  id: string;
  prompt: string;
  image: string;
  createdAt: string;
}

const STORAGE_KEY = "wallforge-history";

/**
 * Get all saved wallpapers
 */
export function getHistory(): WallpaperItem[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data) as WallpaperItem[];
  } catch (error) {
    console.error("Failed to read history:", error);
    return [];
  }
}

/**
 * Save a new wallpaper
 */
export function saveWallpaper(item: WallpaperItem) {
  try {
    const history = getHistory();

    history.unshift(item);

    // Keep only latest 12 wallpapers
    const updatedHistory = history.slice(0, 12);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error("Failed to save wallpaper:", error);
  }
}

/**
 * Delete a wallpaper by id
 */
export function deleteWallpaper(id: string) {
  try {
    const history = getHistory().filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history)
    );
  } catch (error) {
    console.error("Failed to delete wallpaper:", error);
  }
}

/**
 * Clear all history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}