import { handleError, validateEnvVariable } from "@/lib/helpers";
import { LastFmTopTrack, LastFmTrackDetails } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const topTracks = await fetchLastFmTopTracks();
  const allTrackInfo: LastFmTopTrack[] = await Promise.all(
    topTracks.map(async (track: LastFmTrackDetails) => {
      let trackDetail = await fetchLastFmTrackDetails({
        trackTitle: track.name || "",
        artist: track.artist.name || "",
      });
      return {
        trackTitle: track.name,
        artist: track.artist.name,
        albumTitle: trackDetail.albumTitle,
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
        wiki: trackDetail.wiki?.summary,
        playCount: trackDetail.playcount,
      };
    })
  );
  return NextResponse.json({ allTrackInfo });
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
    handleError({ context: "lastFm API", error });
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
    1;
    url.search = params.toString();

    const response = await fetch(url);
    const data = await response.json();
    return data.track;
  } catch (error) {
    handleError({ context: "lastFm API", error });
  }
};
