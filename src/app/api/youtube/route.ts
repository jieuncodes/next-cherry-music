import { supabase } from "@/lib/server/client";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const trackTitle = req.nextUrl.searchParams.get("track");
  const artist = req.nextUrl.searchParams.get("artist");
  const id = req.nextUrl.searchParams.get("id");
  if (!trackTitle || !artist) {
    return new Response(
      JSON.stringify({ error: "track or artist parameter is missing" }),
      {
        status: 400,
      }
    );
  }

  let { data: track, error } = await supabase
    .from("tracks")
    .select("youtubeId")
    .eq("id", id)
    .single();

  if (!track) {
    console.log(
      `supabase doesnt have youtube id for this track: ${trackTitle}`
    );
  }
  if (track && track.youtubeId) {
    console.log("", track.youtubeId);
    return new Response(JSON.stringify({ videoId: track.youtubeId }), {
      status: 200,
    });
  }

  try {
    const videoId = await getYoutubeVideoId({ trackTitle, artist });

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
  const query = `${trackTitle}-${artist}`;

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
