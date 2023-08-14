export interface SpotifyTrack {
  track: {
    album: {
      album_type: string;
      artists: SpotifyArtist[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: SpotifyImage[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export type SpotifyTrackData = {
  name: string;
  artist: { name: string; mbid: string; url: string };
  image: { "#text": string; size: string }[];
};

export interface TrackWithTitleAndArtist {
  "@attr"?: {
    rank: string;
  };
  duration?: string;
  playcount?: string;
  listeners?: string;
  mbid?: string;
  url?: string;
  streamable?: { "#text": string; fulltrack: string };
  image?: { "#text": string; size: string }[];
  name: string;
  artist: { name: string; mbid: string; url: string };
}
