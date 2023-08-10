import axios from "axios";
import * as cheerio from "cheerio";

async function fetchYouTubeVideoId(trackUrl: string) {
  try {
    const response = await axios.get(trackUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const youtubeLink = $(".play-this-track-playlink").attr("href");
    if (youtubeLink && youtubeLink.includes("/watch?v=")) {
      const youtubeId = new URLSearchParams(youtubeLink.split("?")[1]).get("v");
      console.log("youtubeId", youtubeId);
      return youtubeId;
    }
  } catch (error) {
    console.error("Error fetching YouTube video ID:", error);
  }

  return null;
}
export default fetchYouTubeVideoId;
