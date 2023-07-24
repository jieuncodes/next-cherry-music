import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
const videoIdCache: Record<string, string | null> = {};

export async function GET(req: NextRequest, res: NextResponse) {
  const trackTitle = req.nextUrl.searchParams.get("track");
  const artist = req.nextUrl.searchParams.get("artist");

  if (!trackTitle || !artist) {
    return new Response(
      JSON.stringify({ error: "track or artist parameter is missing" }),
      {
        status: 400,
      }
    );
  }

  const cacheKey = `${trackTitle}-${artist}`;
  if (videoIdCache[cacheKey]) {
    console.log("CACHED", videoIdCache);

    return new Response(JSON.stringify({ videoId: videoIdCache[cacheKey] }), {
      status: 200,
    });
  }

  try {
    const videoId = await getYoutubeVideoId({ trackTitle, artist });
    videoIdCache[cacheKey] = videoId as string;
    console.log("videoId", videoIdCache);
    return new Response(JSON.stringify({ videoId }), { status: 200 });
  } catch (error) {
    console.error("Error fetching video ID:", error);
    return new Response(JSON.stringify({ error: "Internal Error" }), {
      status: 500,
    });
  }
}

const getYoutubeVideoId = async ({
  trackTitle,
  artist,
}: {
  trackTitle: string;
  artist: string;
}) => {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });
  const query = `${trackTitle} ${artist}`;

  const requestConfig = {
    part: ["id"],
    q: query,
    type: ["video"],
    maxResults: 1,
  };

  const response = await youtube.search.list(requestConfig);
  const { items } = response.data;

  if (!items || items.length === 0) {
    throw new Error("No videos found");
  }
  const videoId = items[0].id?.videoId;

  return videoId;
};
