import { handleError, validateEnvVariable } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyAccessToken } from "../service";
import { decode } from "punycode";

export async function GET(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams;
  const artistName = params.get("artist") as string;
  const spotifyData = await fetchSpotifyArtistData(artistName);
  return NextResponse.json(spotifyData);
}

const fetchSpotifyArtistData = async (artistName: string) => {
  validateEnvVariable(process.env.SPOTIFY_BASE_URL, "SPOTIFY_BASE_URL");
  const token = await fetchSpotifyAccessToken();
  try {
    const url = new URL(`${process.env.SPOTIFY_BASE_URL}/search`);
    const params = new URLSearchParams({
      type: "artist",
      q: artistName,
      decorate_restrictions: "false",
      best_match: "true",
      include_external: "audio",
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
    handleError({ context: "Spotify API - Artist Data", error });
    throw error;
  }
};
