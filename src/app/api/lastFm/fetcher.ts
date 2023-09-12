import { ensureEncoded } from "@/lib/helpers";
import { AlbumTrack } from "@/types/lastFmTypes";
import { CherryTrack } from "@/types/itemTypes";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;

async function fetchResource(endpoint: string, queryParams?: string) {
  const response = await fetch(
    `${baseURL}${endpoint}${`?${queryParams}` || ""}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch from ${endpoint}. Status: ${response.status}`
    );
  }
  const data = await response.json();
  return data;
}

export const lastFmFetcher = {
  // chart
  fetchTopTracks: () =>
    fetchResource("/api/lastFm/chart", "method=gettoptracks"),
  fetchTopArtists: () =>
    fetchResource("/api/lastFm/chart", "method=gettopartists"),
  fetchTopTags: () => fetchResource("/api/lastFm/chart", "method=gettoptags"),

  //artist
  fetchArtistInfo: (artist: string) =>
    fetchResource(
      "/api/lastFm/artist",
      `method=getinfo&artist=${ensureEncoded(artist)}`
    ),
  fetchArtistTopTracks: (artist: string) =>
    fetchResource(
      "/api/lastFm/artist",
      `method=gettoptracks&artist=${ensureEncoded(artist)}`
    ),
  fetchSimilarArtists: (artist: string) =>
    fetchResource(
      "/api/lastFm/artist",
      `method=getsimilar&artist=${ensureEncoded(artist)}`
    ),

  //track
  fetchTrackDetail: ({
    trackTitle,
    artist,
  }: {
    trackTitle: string;
    artist: string;
  }) =>
    fetchResource(
      "/api/lastFm/track",
      `method=getinfo&trackTitle=${ensureEncoded(
        trackTitle
      )}&artist=${ensureEncoded(artist)}`
    ),

  //tag
  fetchTagTopArtists: (tag: string) =>
    fetchResource(
      "/api/lastFm/tag",
      `method=gettopartists&tag=${ensureEncoded(tag)}`
    ),
  fetchTagTopAlbums: (tag: string) =>
    fetchResource(
      "/api/lastFm/tag",
      `method=gettopalbums&tag=${ensureEncoded(tag)}`
    ),
  fetchTagTopTracks: (tag: string) =>
    fetchResource(
      "/api/lastFm/tag",
      `method=gettoptracks&tag=${ensureEncoded(tag)}`
    ),
  //search
  fetchTitleSearchResults: (keyword: string) =>
    fetchResource(
      "/api/lastFm/track",
      `method=search&trackTitle=${ensureEncoded(keyword)}`
    ),
  fetchArtistSearchResults: (keyword: string) =>
    fetchResource(
      "/api/lastFm/artist",
      `method=search&artist=${ensureEncoded(keyword)}`
    ),

  //album
  fetchAlbumInfo: async ({
    artist,
    album,
  }: {
    artist: string;
    album: string;
  }) => {
    const data = await fetchResource(
      "/api/lastFm/album",
      `method=getinfo&artist=${ensureEncoded(artist)}&album=${ensureEncoded(
        album
      )}`
    );
    const tracksArray = Array.isArray(data.album.tracks.track)
      ? data.album.tracks.track
      : [data.album.tracks.track];
    const newTracks: CherryTrack[] = tracksArray.map((track: AlbumTrack) => {
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
  },
};
