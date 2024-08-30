export function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "www.youtube.com"
    ) {
      return false;
    }

    // Check that the URL starts with "https://www.youtube.com/watch?v="
    if (
      !parsedUrl.pathname.startsWith("/watch") ||
      !parsedUrl.searchParams.has("v")
    ) {
      return false;
    }

    const videoId = parsedUrl.searchParams.get("v");
    if (!videoId) {
      return false;
    }
    // get the exact URL
    const expectedUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return true;
  } catch (error) {
    console.error("Invalid URL:", error);
    return false;
  }
}
