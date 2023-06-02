import client from "../../../libs/server/client";

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";

interface LastFmArtist {
  name: string;
  mbid: string;
  url: string;
}

interface LastFmImage {
  "#text": string;
  size: string;
}

interface LastFmTopTrack {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  artist: LastFmArtist;
  image: LastFmImage[];
}

export const getLastFmTopTracks = async (): Promise<LastFmTopTrack[]> => {
  try {
    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "chart.getTopTracks",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    });
    url.search = params.toString();

    const response = await fetch(url);
    const data = await response.json();
    return data.tracks.track;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from Last.fm API:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface Album {
  artist: string;
  title: string;
  mbid: string;
}

interface Tag {
  name: string;
  url: string;
}

interface TopTags {
  tag: Tag[];
}

interface TrackInfo {
  duration: string;
  playcount: string;
  artist: Artist;
  album: Album;
  toptags: TopTags;
}

export const getLastFmTrackInfo = async (
  artist: string,
  trackTitle: string
): Promise<TrackInfo | null> => {
  try {
    const trackId = `${trackTitle}-${artist}`;
    const cachedData = (await client.lastFmTrack.findFirst({
      where: { trackId },
    })) as TrackInfo | null;

    if (cachedData) {
      return cachedData;
    }

    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "track.getInfo",
      api_key: process.env.LAST_FM_API_KEY!,
      artist: artist,
      track: trackTitle,
      format: "json",
    });
    url.search = params.toString();

    const response = await fetch(url);
    const data = await response.json();
    const lastFmTrackInfo = {
      trackId: trackId,
      trackTitle: trackTitle,
      artist: data.track.artist.name,
      albumName: data.track.ablum.title || "no album",
      albumImg: data.track.album.image[2]["#text"] || "no image",
      duration: data.track.duration,
      playcount: data.track.playcount,
      album: data.track.album,
      toptags: data.track.toptags.tag,
    };
    await client.lastFmTrack.create({
      data: { ...lastFmTrackInfo },
    });

    return lastFmTrackInfo;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data from Last.fm API:", error.message);
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};
