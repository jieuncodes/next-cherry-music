import { Track } from "@/lib/server/database.types";
import { TrackWithTitleAndArtist } from "@/types/spotify/types";
import { AlbumTrack, LastFmAlbumInfo, LastFmTrack } from "@/types/trackTypes";

export async function fetchTopTracks(): Promise<LastFmTrack[]> {
  const response = await fetch(`${process.env.URL}/api/lastFm/top-tracks`);

  return response.json();
}

export async function fetchArtistTopTracks(
  artist: string
): Promise<LastFmTrack[]> {
  const artistEncoded = encodeURIComponent(artist);

  const response = await fetch(
    `${process.env.URL}/api/lastFm/artist/get-top-tracks?artist=${artistEncoded}`
  );
  const data = await response.json();
  return data.toptracks.track;
}

export async function fetchTrackDetail(
  track: TrackWithTitleAndArtist
): Promise<any> {
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

export async function fetchAlbumInfo({
  artist,
  album,
}: {
  artist: string;
  album: string;
}): Promise<LastFmAlbumInfo> {
  const encodedArtist = encodeURIComponent(artist);
  const encodedAlbum = encodeURIComponent(album);
  const response = await fetch(
    `${process.env.URL}/api/lastFm/album/get-info?artist=${encodedArtist}&album=${encodedAlbum}`
  );
  const data = await response.json();

  const tracksArray = Array.isArray(data.album.tracks.track)
    ? data.album.tracks.track
    : [data.album.tracks.track];

  const newTracks: Track[] = tracksArray.map((track: AlbumTrack) => {
    return {
      name: track.name,
      duration: track.duration,
      playcount: data.album.playcount,
      listeners: data.album.listeners,
      mbid: data.album.mbid,
      url: track.url,
      streamable: track.streamable,
      artist: {
        name: data.album.artist,
        mbid: data.album.artistMbid,
        url: data.album.artistUrl,
      },
      image: data.album.image,
    };
  });
  const newData = { ...data.album, tracks: { track: [...newTracks] } };
  return newData;
}
