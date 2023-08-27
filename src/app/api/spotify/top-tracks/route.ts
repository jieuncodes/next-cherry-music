import { handleError, validateEnvVariable } from "@/lib/helpers";
import { SpotifyTrack, SpotifyTrackInfo } from "@/types/spotifyTypes";
import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyAccessToken } from "../service";

export async function GET(req: NextRequest, res: NextResponse) {
  const playlistId = req.nextUrl.searchParams.get("playlistid");

  if (!playlistId) {
    return NextResponse.error();
  }

  const spotifyData = await fetchSpotifyPlaylist(playlistId);
  return NextResponse.json(spotifyData);
}

const fetchSpotifyPlaylist = async (
  playlistId: string
): Promise<SpotifyTrackInfo[]> => {
  validateEnvVariable(
    process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL,
    "NEXT_PUBLIC_SPOTIFY_BASE_URL"
  );

  const token = await fetchSpotifyAccessToken();
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    handleError({ context: "Spotify API - Top Tracks Data", error });
    throw error;
  }
};
