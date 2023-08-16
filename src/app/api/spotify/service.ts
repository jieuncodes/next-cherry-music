import { SpotifyTrackData } from "@/types/spotify/types";
import { fetchTrackDetail } from "../lastFm/service";
import { LastFmTrack } from "@/types/trackTypes";

export const fetchSpotifyAccessToken = async () => {
  const tokenResponse = await fetch(process.env.SPOTIFY_TOKEN_URL as string);
  const tokenData = await tokenResponse.json();
  return tokenData.accessToken;
};

export async function fetchSpotifyTopTracks(): Promise<SpotifyTrackData[]> {
  const response = await fetch(`${process.env.URL}/api/spotify/top-tracks`);
  return response.json();
}

export const refineSpotifyTracksIntoLastFmTrack = async (
  spotifyTrack: SpotifyTrackData
): Promise<LastFmTrack> => {
  console.log("spotifyTrack", spotifyTrack);
  const lastFmDetails = await fetchTrackDetail(spotifyTrack);
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
