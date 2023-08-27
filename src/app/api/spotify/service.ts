import { SpotifyTrackData } from "@/types/spotify/types";
import { LastFmTrack } from "@/types/trackTypes";
import { ensureEncoded } from "@/lib/helpers";
import { lastFmFetcher } from "../lastFm/fetcher";

export const fetchSpotifyAccessToken = async () => {
  const tokenResponse = await fetch(
    process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_URL as string
  );
  const tokenData = await tokenResponse.json();
  return tokenData.accessToken;
};
const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;

export async function fetchSpotifyArtist(artist: string) {
  const encodedAritst = ensureEncoded(artist);
  const response = await fetch(
    `${baseURL}/api/spotify/artist?artist=${encodedAritst}`
  );
  const data = await response.json();
  return data;
}
export const getSpotifyArtistImg = async (artist: string) => {
  const spotifyArtist = await fetchSpotifyArtist(artist);
  return spotifyArtist.best_match?.items[0]?.images[0]?.url;
};

export async function fetchSpotifyPlaylist(
  playlistId: string
): Promise<SpotifyTrackData[]> {
  const response = await fetch(
    `${baseURL}/api/spotify/top-tracks?playlistid=${playlistId}`
  );
  return response.json();
}

export const refineSpotifyTracksIntoLastFmTrack = async (
  spotifyTrack: SpotifyTrackData
): Promise<LastFmTrack> => {
  // const lastFmDetails = await lastFmFetcher.fetchTrackDetail(spotifyTrack);
  return {
    name: spotifyTrack.name,
    duration: "",
    playcount: "",
    listeners: "",
    mbid: "",
    url: "",
    streamable: { "#text": "0", fulltrack: "0" },
    artist: spotifyTrack.artist,
    albumTitle: spotifyTrack.albumTitle,
    image: spotifyTrack.image,
  };
};

// lastFmDetails {
//   track: {
//     name: "Baby Don't Hurt Me",
//     url: 'https://www.last.fm/music/David+Guetta/_/Baby+Don%27t+Hurt+Me',
//     duration: '140000',
//     streamable: { '#text': '0', fulltrack: '0' },
//     listeners: '154178',
//     playcount: '650185',
//     artist: {
//       name: 'David Guetta',
//       mbid: '302bd7b9-d012-4360-897a-93b00c855680',
//       url: 'https://www.last.fm/music/David+Guetta'
//     },
//     album: {
//       artist: 'David Guetta',
//       title: "Baby Don't Hurt Me",
//       url: 'https://www.last.fm/music/David+Guetta/Baby+Don%27t+Hurt+Me',
//       image: [Array]
//     },
//     toptags: { tag: [Array] }
//   }
// }
// spotifyTrack {
//   name: "Baby Don't Hurt Me",
//   artist: { name: 'David Guetta', mbid: '', url: '' },
//   albumTitle: "Baby Don't Hurt Me",
//   image: [
//     {
//       '#text': 'https://i.scdn.co/image/ab67616d0000b2730b4ef75c3728599aa4104f7a',
//       size: 640
//     },
//     {
//       '#text': 'https://i.scdn.co/image/ab67616d00001e020b4ef75c3728599aa4104f7a',
//       size: 300
//     },
//     {
//       '#text': 'https://i.scdn.co/image/ab67616d000048510b4ef75c3728599aa4104f7a',
//       size: 64
//     }
//   ]
// }
