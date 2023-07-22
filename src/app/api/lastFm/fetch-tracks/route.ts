import { Track } from "@/lib/server/database.types";
import { LastFmTopTrack } from "@/types/trackTypes";
import { NextResponse } from "next/server";

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";

export async function GET(request: Request) {
  try {
    const topTracks = await fetchLastFmTopTracks();
    const allTrackInfo: Track[] = await Promise.all(
      topTracks.map(async (track: LastFmTopTrack) => {
        const trackDetail = await fetchLastFmTrackDetails(
          track.artist.name,
          track.name
        );
        return {
          trackTitle: track.name,
          artist: track.artist.name,
          albumTitle: trackDetail.album?.title,
          albumImgUrl: trackDetail.album?.image[3]["#text"],
          tags: trackDetail.toptags?.tag,
          wiki: trackDetail.wiki?.summary,
        };
      })
    );

    return NextResponse.json(allTrackInfo);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const fetchLastFmTopTracks = async () => {
  try {
    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "chart.getTopTracks",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    });

    url.search = params.toString();

    const response = await fetch(url);

    const data = await response.json();
    return data.tracks.track;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from Last.fm API:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

export const fetchLastFmTrackDetails = async (
  artist: string,
  trackTitle: string
) => {
  try {
    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "track.getInfo",
      api_key: process.env.LAST_FM_API_KEY!,
      artist: artist,
      track: trackTitle,
      format: "json",
    });
    url.search = params.toString();

    const response = await fetch(url);
    const data = await response.json();
    return data.track;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from Last.fm API:", error.message);
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};
