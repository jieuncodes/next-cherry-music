import { handleError, simpleHash, validateEnvVariable } from "@/lib/helpers";
import { LastFmTopTrack, LastFmTrackDetails } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const topTracks = await fetchLastFmTopTracks();
  const allTrackInfo: LastFmTopTrack[] = await Promise.all(
    topTracks.map(async (track: LastFmTrackDetails) => {
      const fetchDetailResponse = await fetch(
        `${process.env.URL}/api/lastFm/track/details?trackTitle=${track.name}&artist=${track.artist.name}`
      );
      let trackDetail = await fetchDetailResponse.json();
      const urlLastPart = trackDetail.url.split("/");
      const id = simpleHash(urlLastPart[urlLastPart.length - 1]);

      const youtubeResponse: Response = await fetch(
        `${process.env.URL}/api/youtube?track=${track.name}&artist=${track.artist.name}&id=${id}`,
        {
          method: "GET",
        }
      );

      if (!youtubeResponse.ok) {
        throw new Error("Error fetching video ID");
      }

      const youtubeData = await youtubeResponse.json();
      return {
        id,
        trackTitle: track.name,
        artist: track.artist.name,
        youtubeId: youtubeData.videoId || "",
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
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
