import { LastFmTrack } from "@/types/trackTypes";

export async function fetchTopTracks(): Promise<LastFmTrack[]> {
  const response = await fetch(`${process.env.URL}/api/lastFm/top-tracks`);
  return response.json();
}

export async function fetchArtistTopTracks(
  artist: string
): Promise<LastFmTrack[]> {
  const response = await fetch(
    `${process.env.URL}/api/lastFm/artist/get-top-tracks?artist=${artist}`
  );
  const data = await response.json();
  return data.toptracks.track;
}

export async function fetchTrackDetail(track: LastFmTrack): Promise<any> {
  const response = await fetch(
    `${process.env.URL}/api/lastFm/track/details?trackTitle=${track.name}&artist=${track.artist.name}`
  );
  return response.json();
}
