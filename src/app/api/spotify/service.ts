import { SpotifyTrackData } from "@/types/spotify/types";
import { LastFmTrack } from "@/types/trackTypes";
import { ensureEncoded } from "@/lib/helpers";
import { lastFmFetcher } from "../lastFm/fetcher";

export const fetchSpotifyAccessToken = async () => {
  const tokenResponse = await fetch(
    process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_URL as string
  );
  const tokenData = await tokenResponse.json();
  return tokenData.accessToken;
};

export async function fetchSpotifyArtist(artist: string) {
  const encodedAritst = ensureEncoded(artist);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/spotify/artist?artist=${encodedAritst}`
  );
  const data = await response.json();
  return data;
}

export async function fetchSpotifyPlaylist(
  playlistId: string
): Promise<SpotifyTrackData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/spotify/top-tracks?playlistid=${playlistId}`
  );
  return response.json();
}

export const refineSpotifyTracksIntoLastFmTrack = async (
  spotifyTrack: SpotifyTrackData
): Promise<LastFmTrack> => {
  const lastFmDetails = await lastFmFetcher.fetchTrackDetail(spotifyTrack);
  return {
    name: spotifyTrack.name,
    duration: lastFmDetails.duration,
    playcount: lastFmDetails.playcount,
    listeners: lastFmDetails.listeners,
    mbid: lastFmDetails.mbid,
    url: lastFmDetails.url,
    streamable: lastFmDetails.streamable,
    artist: spotifyTrack.artist,
    albumTitle: spotifyTrack.albumTitle,
    image: spotifyTrack.image,
  };
};
