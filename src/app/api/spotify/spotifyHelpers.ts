import { handleError, validateEnvVariable } from "@/lib/helpers";
import { fetchSpotifyAccessToken } from "./service";

export const fetchSpotifyTrackData = async (trackTitle: string) => {
  validateEnvVariable(
    process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL,
    "NEXT_PUBLIC_SPOTIFY_BASE_URL"
  );

  const token = await fetchSpotifyAccessToken();
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/search`);
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
