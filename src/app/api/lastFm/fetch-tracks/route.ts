import { handleFetchError, validateEnvVariable } from "@/lib/utils";
import { LastFmTopTrack, LastFmTrackDetails } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

let topTracksCache: LastFmTrackDetails[] | null = null;
const trackDetailsCache: Record<string, any> = {};

const CACHE_DURATION_HOURS = 6;
const CACHE_DURATION_MILLISECONDS = CACHE_DURATION_HOURS * 60 * 60 * 1000;
let lastFetchedTime: Date | null = null;

const isCacheExpired = () => {
  return lastFetchedTime
    ? new Date().getTime() - lastFetchedTime.getTime() >=
        CACHE_DURATION_MILLISECONDS
    : true;
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (!topTracksCache || isCacheExpired()) {
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
    handleFetchError({ context: "lastFm API", error });
  }
}

export const fetchLastFmTopTracks = async () => {
  validateEnvVariable(process.env.LAST_FM_BASE_URL, "LAST_FM_BASE_URL");
  validateEnvVariable(process.env.LAST_FM_API_KEY, "LAST_FM_API_KEY");

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
    handleFetchError({ context: "lastFm API", error });
  }
};

export const fetchLastFmTrackDetails = async ({
  trackTitle,
  artist,
}: {
  trackTitle: string;
  artist: string;
}) => {
  validateEnvVariable(process.env.LAST_FM_BASE_URL, "LAST_FM_BASE_URL");
  validateEnvVariable(process.env.LAST_FM_API_KEY, "LAST_FM_API_KEY");
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
    handleFetchError({ context: "lastFm API", error });
  }
};
