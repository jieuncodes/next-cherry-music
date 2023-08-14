import { handleError, validateEnvVariable } from "@/lib/helpers";
import { SpotifyTrack, SpotifyTrackData } from "@/types/spotify/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const spotifyData = await fetchSpotifyTopTracks();
  return NextResponse.json(spotifyData);
}
const fetchSpotifyAccessToken = async () => {
  const tokenResponse = await fetch(process.env.SPOTIFY_TOKEN_URL as string);
  const tokenData = await tokenResponse.json();
  return tokenData.accessToken;
};

const fetchSpotifyTopTracks = async (): Promise<SpotifyTrackData[]> => {
  validateEnvVariable(process.env.SPOTIFY_BASE_URL, "SPOTIFY_BASE_URL");

  const token = await fetchSpotifyAccessToken();
  try {
    const playlistID = "37i9dQZF1DXcBWIGoYBM5M";
    const url = new URL(
      `${process.env.SPOTIFY_BASE_URL}/playlists/${playlistID}/tracks`
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const trackData = data.items.map((item: SpotifyTrack) => {
      return {
        name: item.track.name,
        artist: { name: item.track.artists[0].name, mbid: "", url: "" },
        image: item.track.album.images.map((image) => {
          return {
            "#text": image.url,
            size: image.width,
          };
        }),
      };
    });
    return trackData;
  } catch (error) {
    handleError({ context: "Spotify API - Top Tracks Data", error });
    throw error;
  }
};
