import { ensureEncoded, validateEnvVariable } from "@/lib/helpers";
import { LastFmTrack } from "@/types/lastFmTypes";
import { NextRequest } from "next/server";
import { lastFmFetcher } from "../../lastFm/fetcher";
import {
  fetchSpotifyPlaylist,
  refineSpotifyTracksIntoLastFmTrack,
} from "../../spotify/service";

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
    case "africatop":
      return {
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_AFRICA_TOP,
        envVarName: "NEXT_PUBLIC_SPOTIFY_AFRICA_TOP",
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

export const fetchTrackListByQueryType = async (
  query: string,
  req: NextRequest
): Promise<LastFmTrack[]> => {
  const artist = req.nextUrl.searchParams.get("artist");
  const tag = req.nextUrl.searchParams.get("tag");
  const album = req.nextUrl.searchParams.get("album");
  const refinedTracks: LastFmTrack[] = [];

  switch (query) {
    case "top":
    case "koreatop":
    case "ustop":
    case "africatop":
      const { envVar, envVarName } = getSpotifyPlaylistId(query);

      validateEnvVariable(envVar, envVarName);
      const spotifyPlaylist = await fetchSpotifyPlaylist(envVar!);

      const refinedTracksPromises = spotifyPlaylist.map((track) =>
        refineSpotifyTracksIntoLastFmTrack(track)
      );
      const refinedTracks = await Promise.all(refinedTracksPromises);
      return refinedTracks;

    case "artisttop":
      if (!artist) {
        throw new Error("Artist name is required for artisttop query.");
      }
      const data = await lastFmFetcher.fetchArtistTopTracks(artist);
      return data.toptracks.track;

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

    default:
      throw new Error("Invalid query parameter.");
  }
};
