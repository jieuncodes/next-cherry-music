import { LastFmTopTrack, LastFmTrackDetails } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

let topTracksCache: LastFmTrackDetails[] | null = null;
const trackDetailsCache: Record<string, any> = {};

let lastFetchedTime: Date | null = null;
const CACHE_DURATION_HOURS = 6;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const currentTime = new Date();
    const hasSixHoursPassed =
      lastFetchedTime &&
      currentTime.getTime() - lastFetchedTime.getTime() >=
        CACHE_DURATION_HOURS * 60 * 60 * 1000;

    if (!topTracksCache || hasSixHoursPassed) {
      console.log("update has done before 6hour. update again.");
      topTracksCache = await fetchLastFmTopTracks();
      lastFetchedTime = new Date();
    }

    if (!topTracksCache) {
      throw new Error("Failed to fetch top tracks.");
    }

    const allTrackInfo: LastFmTopTrack[] = await Promise.all(
      topTracksCache.map(async (track: LastFmTrackDetails) => {
        const key = `${track.name}-${track.artist.name}`;
        let trackDetail = trackDetailsCache[key];

        if (!trackDetail) {
          trackDetail = await fetchLastFmTrackDetails({
            trackTitle: track.name || "",
            artist: track.artist.name || "",
          });
          trackDetailsCache[key] = trackDetail;
        }

        return {
          id: key,
          trackTitle: track.name,
          artist: track.artist.name,
          albumTitle: trackDetail.albumTitle,
          albumImgUrl: trackDetail.album?.image[3]["#text"],
          tags: trackDetail.toptags?.tag,
          wiki: trackDetail.wiki?.summary,
        };
      })
    );

    return NextResponse.json({ allTrackInfo });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const fetchLastFmTopTracks = async () => {
  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
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

export const fetchLastFmTrackDetails = async ({
  trackTitle,
  artist,
}: {
  trackTitle: string;
  artist: string;
}) => {
  console.log("trackTitle,aritst", trackTitle, artist);
  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
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
