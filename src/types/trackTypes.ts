type Streamable = { "#text": string; fulltrack: string };
export type Artist = { name: string; mbid: string; url: string };
type AlbumImage = { "#text": string; size: string };

export interface LastFmTrack {
  "@attr"?: {
    rank: string;
  };
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: { "#text": string; fulltrack: string };
  artist: Artist;
  albumTitle?: string;
  image: AlbumImage[];
}

export interface LastFmTrackDetails {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: AlbumImage[];
}

export interface LastFmArtistInfo {
  artist: {
    name: string;
    mbid: string;
    url: string;
    image: string[];
    streamable: string;
    ontour: string;
    stats: { listeners: string; playcount: string };
    similar: { artist: Artist[] };
    tags: { tag: { name: string; url: string }[] };
    bio: {
      links: { link: { "#text": string; rel: string; href: string }[] };
      published: string;
      summary: string;
    };
  };
}

export interface SpotifyBestMatchArtistInfo {
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface LastFmAlbumInfo {
  artist: string;
  image: AlbumImage[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  tags: { tag: { name: string; url: string }[] };
  tracks: { track: LastFmTrack[] };
  url: string;
  wiki: { published: string; summary: string };
}

export interface AlbumTrack {
  "@attr"?: {
    rank: string;
  };
  name: string;
  duration: string;
  mbid: string;
  url: string;
  streamable: { "#text": string; fulltrack: string };
  artist: Artist;
}

export interface LastFmArtists {
  artists: {
    artist: Artist[];
  };
}
