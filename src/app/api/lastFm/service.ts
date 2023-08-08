import { LastFmTrack } from "@/types/trackTypes";
import { NextResponse } from "next/server";

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
  try {
    const trackTitleEncoded = encodeURIComponent(track.name);
    const artistEncoded = encodeURIComponent(track.artist.name);

    const response = await fetch(
      `${process.env.URL}/api/lastFm/track/details?trackTitle=${trackTitleEncoded}&artist=${artistEncoded}`
    );

    if (!response.ok) {
      throw new Error(
        `FetchTrackDetail response was not ok: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON for track detail:", error);
    throw new Error("Failed to fetch or parse track detail JSON");
  }
}
