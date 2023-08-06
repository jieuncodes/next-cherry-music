export interface LastFmTopTrack {
  id: string;

  albumImgUrl: string | null;
  albumTitle: string | null;
  artist: string | null;
  tags: string[] | null;
  trackTitle: string | null;
  wiki: string | null;
}
type Streamable = { "#text": string; fulltrack: string };
type Artist = { name: string; mbid: string; url: string };
type AlbumImage = { "#text": string; size: string };

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

export interface ArtistTopTracks {
  "@attr": {
    rank: string;
  };
  artist: {
    mbid: string;
    name: string;
    url: string;
  };
  name: string;
}
