import { SpotifyImage, SpotifyTrackInfo } from "@/types/spotifyTypes";
import { LastFmTrack } from "@/types/lastFmTypes";
import { ensureEncoded } from "@/lib/helpers";
import { fetchSpotifyTrackInfo } from "./spotifyHelpers";

export const fetchSpotifyAccessToken = async () => {
  const tokenResponse = await fetch(
    process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_URL as string
  );
  const tokenData = await tokenResponse.json();
  return tokenData.accessToken;
};
const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;

export async function fetchSpotifyArtist(artist: string) {
  const encodedAritst = ensureEncoded(artist);
  const response = await fetch(
    `${baseURL}/api/spotify/artist?artist=${encodedAritst}`
  );
  const data = await response.json();

  return data;
}
export const getSpotifyArtistImg = async (artist: string) => {
  const spotifyArtist = await fetchSpotifyArtist(artist);
  return spotifyArtist.best_match?.items[0]?.images[0]?.url;
};

export async function fetchSpotifyPlaylist(
  playlistId: string
): Promise<SpotifyTrackInfo[]> {
  const response = await fetch(
    `${baseURL}/api/spotify/top-tracks?playlistid=${playlistId}`
  );
  const data = await response.json();
  return data.items;
}

export const refineSpotifyTracksIntoLastFmTrack = async (
  spotifyTrack: SpotifyTrackInfo
): Promise<LastFmTrack> => {
  const spotifyTrackDetail = await fetchSpotifyTrackInfo(
    spotifyTrack.track.name
  );
  const data = {
    name: spotifyTrackDetail.tracks.items[0].name,
    duration: spotifyTrackDetail.tracks.items[0].duration_ms?.toString(),
    playcount: "",
    listeners: "",
    mbid: "",
    url: "",
    streamable: { "#text": "0", fulltrack: "0" },
    artist: {
      name: spotifyTrackDetail.tracks.items[0].artists[0].name || "",
      mbid: "",
      url: "",
    },
    albumTitle: "",
    image: spotifyTrackDetail.tracks.items[0].album.images.map(
      (image: SpotifyImage) => {
        return {
          "#text": image.url,
          size: image.width,
        };
      }
    ),
  };
  return data;
};
