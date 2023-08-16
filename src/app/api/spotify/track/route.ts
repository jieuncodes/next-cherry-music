import { handleError, validateEnvVariable } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyAccessToken } from "../service";

export async function GET(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams;
  const trackTitle = params.get("title") as string;
  const spotifyData = await fetchSpotifyTrackData(trackTitle);
  return NextResponse.json(spotifyData);
}

export const fetchSpotifyTrackData = async (trackTitle: string) => {
  validateEnvVariable(process.env.SPOTIFY_BASE_URL, "SPOTIFY_BASE_URL");

  const token = await fetchSpotifyAccessToken();
  try {
    const url = new URL(`${process.env.SPOTIFY_BASE_URL}/search`);
    const params = new URLSearchParams({
      type: "track",
      q: trackTitle,
      limit: "1",
    });

    url.search = params.toString();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    handleError({ context: "Spotify API - track Data", error });
    throw error;
  }
};
