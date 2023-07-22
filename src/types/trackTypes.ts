export interface LastFmArtist {
  name: string;
  mbid: string;
  url: string;
}

export interface LastFmImage {
  "#text": string;
  size: string;
}

export interface LastFmTopTrack {
  name: string;
  playcount: string;
  url: string;
  artist: LastFmArtist;
  image: LastFmImage[];
  "@attr": {
    rank: string;
  };
}

export interface Album {
  artist: string;
  title: string;
  mbid: string;
}

export interface Tag {
  name: string;
  url: string;
}
