import axios from "axios";
import * as cheerio from "cheerio";

interface FetchYouTubeVideoIdProps {
  artist: string;
  trackTitle: string;
}

async function fetchYouTubeVideoId({
  artist,
  trackTitle,
}: FetchYouTubeVideoIdProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    artist + "-" + trackTitle
  )}`;

  try {
    const response = await axios.get(searchUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const videoLink = $("a.yt-simple-endpoint").attr("href");
    if (videoLink && videoLink.includes("/watch?v=")) {
      return new URLSearchParams(videoLink.split("?")[1]).get("v");
    }
  } catch (error) {
    console.error("Error fetching YouTube video ID:", error);
  }

  return null;
}

export default fetchYouTubeVideoId;
