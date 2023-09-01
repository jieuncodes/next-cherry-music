import { ensureEncoded, validateEnvVariable } from "@/lib/helpers";
import { LastFmSearchResTrack, LastFmTrack } from "@/types/lastFmTypes";
import { NextRequest } from "next/server";
import { lastFmFetcher } from "../../lastFm/fetcher";
import {
  fetchSpotifyPlaylist,
  refineSpotifyTracksIntoLastFmTrack,
} from "../../spotify/service";
import { CherryTrack } from "@/types/itemTypes";
import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { fetchSpotifyTrackInfo } from "../../spotify/spotifyHelpers";

export const getSpotifyPlaylistId = (query: string) => {
  switch (query) {
    case "koreatop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_KOREA_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_KOREA_TOP",
      };
    case "ustop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_US_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_US_TOP",
      };
    case "colombiatop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_COLOMBIA_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_COLOMBIA_TOP",
      };
    case "top":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_TODAY_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_TODAY_TOP",
      };

    default:
      throw new Error("Invalid query provided");
  }
};
interface fetchTrackListByQueryTypeProps {
  query: string;
  offset?: number | null;
  count?: number | null;
}

export const fetchTrackListByQueryType = async (
  { query, offset, count }: fetchTrackListByQueryTypeProps,
  req: NextRequest
): Promise<LastFmTrack[] | LastFmSearchResTrack[]> => {
  const artist = req.nextUrl.searchParams.get("artist");
  const tag = req.nextUrl.searchParams.get("tag");
  const album = req.nextUrl.searchParams.get("album");
  const keyword = req.nextUrl.searchParams.get("keyword");
  switch (query) {
    case "top":
    case "koreatop":
    case "ustop":
    case "colombiatop":
      const { envVar, envVarName } = getSpotifyPlaylistId(query);
      validateEnvVariable(envVar, envVarName);
      const spotifyPlaylist = await fetchSpotifyPlaylist(envVar!);

      let startIdx = 0;
      let endIdx = spotifyPlaylist.length;

      if (offset) {
        startIdx = Number(offset);
      }
      if (count) {
        endIdx = Number(count);
      }
      const slicedSpotifyPlaylist = spotifyPlaylist.slice(startIdx, endIdx);
      const refinedTracksPromises = slicedSpotifyPlaylist.map((track) =>
        refineSpotifyTracksIntoLastFmTrack(track)
      );
      const refinedTracks = await Promise.all(refinedTracksPromises);
      return refinedTracks;

    case "artisttop":
      if (!artist) {
        throw new Error("Artist name is required for artisttop query.");
      }
      const data = await lastFmFetcher.fetchArtistTopTracks(artist);
      return data.toptracks.track.slice(0, 7);

    case "tagtop":
      if (!tag) {
        throw new Error("Tag name is required for tagtop query.");
      }
      const result = await lastFmFetcher.fetchTagTopTracks(tag);
      return result.tracks.track;

    case "albumtracks":
      if (!album || !artist) {
        throw new Error(
          "Album and artist name are required for albumtracks query."
        );
      }
      const albumInfo = await lastFmFetcher.fetchAlbumInfo({
        artist: ensureEncoded(artist),
        album,
      });
      const tracksArray = Array.isArray(albumInfo.tracks.track)
        ? albumInfo.tracks.track
        : [albumInfo.tracks.track];
      return tracksArray;

    case "searchTitle":
      if (!keyword) {
        throw new Error("Keyword is required for search query.");
      }
      const searchResult = await lastFmFetcher.fetchTitleSearchResults(keyword);
      if (!searchResult) return [];
      console.log(
        "searchResult.results.trackmatches.track",
        searchResult.results.trackmatches.track
      );
      return [...searchResult.results.trackmatches.track];

    case "searchArtist":
      if (!keyword) {
        throw new Error("Keyword is required for search query.");
      }
      const artistSearchResult = await lastFmFetcher.fetchArtistSearchResults(
        keyword
      );
      if (!artistSearchResult) return [];

      return artistSearchResult.artistmatches.artist;

    default:
      throw new Error("Invalid query parameter.");
  }
};

export const processTrack = async (
  track: LastFmTrack | LastFmSearchResTrack,
  index: number
): Promise<CherryTrack> => {
  const isSearchResTrack =
    "artist" in track && typeof track.artist === "string";
  const trackTitle = track.name;
  const artistName = isSearchResTrack
    ? (track as LastFmSearchResTrack).artist
    : (track as LastFmTrack).artist.name;

  const lastFmTrackDetail = await lastFmFetcher.fetchTrackDetail({
    trackTitle: trackTitle,
    artist: artistName,
  });
  const [youtubeId, spotifyData] = await Promise.all([
    fetchYouTubeVideoId(lastFmTrackDetail.track?.url),
    fetchSpotifyTrackInfo(trackTitle),
  ]);
  const spotifyTrack = spotifyData.tracks?.items?.[0];
  return {
    key: index + "",
    rank: index,
    trackTitle: decodeURIComponent(trackTitle),
    artist: decodeURIComponent(artistName) || "",
    youtubeId,
    albumTitle:
      lastFmTrackDetail.album?.title || spotifyTrack?.album?.name || "",
    albumImgUrl:
      spotifyTrack?.album?.images[0].url || "/images/default_album_cover.webp",
    tags: lastFmTrackDetail?.track?.toptags?.tag || [],
    playCount: lastFmTrackDetail?.track?.playcount || 0,
    wiki: lastFmTrackDetail?.track?.wiki || "",
  };
};
