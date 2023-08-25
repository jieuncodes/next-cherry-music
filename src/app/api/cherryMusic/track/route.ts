import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { validateEnvVariable, ensureEncoded } from "@/lib/helpers";
import { generateTrackId } from "@/lib/utils";
import { SpotifyTrackData } from "@/types/spotify/types";
import { LastFmTrack } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";
import { lastFmFetcher } from "../../lastFm/fetcher";
import {
  fetchSpotifyPlaylist,
  refineSpotifyTracksIntoLastFmTrack,
} from "../../spotify/service";
import { fetchSpotifyTrackData } from "../../spotify/spotifyHelpers";

const getSpotifyPlaylistId = (query: string) => {
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

async function fetchTrackListByQueryType(
  query: string,
  req: NextRequest
): Promise<LastFmTrack[]> {
  const artist = req.nextUrl.searchParams.get("artist");
  const tag = req.nextUrl.searchParams.get("tag");
  const album = req.nextUrl.searchParams.get("album");
  const trackTitle = req.nextUrl.searchParams.get("track");
  const refinedTracks: LastFmTrack[] = [];

  switch (query) {
    case "top":
    case "koreatop":
    case "ustop":
    case "africatop":
      const { envVar, envVarName } = getSpotifyPlaylistId(query);

      validateEnvVariable(envVar, envVarName);
      const spotifyPlaylist = await fetchSpotifyPlaylist(envVar!);

      for (const track of spotifyPlaylist) {
        const refined = await refineSpotifyTracksIntoLastFmTrack(track);
        refinedTracks.push(refined);
      }
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

    case "track":
      if (!trackTitle || !artist) {
        throw new Error("Track and artist name are required for track query.");
      }
      const spotifyTrackData = await fetchSpotifyTrackData(trackTitle);
      const spotifyTrack: SpotifyTrackData = {
        name: spotifyTrackData.tracks.items[0].name,
        artist: {
          name: spotifyTrackData.tracks.items[0].artists[0].name,
          mbid: "",
          url: spotifyTrackData.tracks.items[0].artists[0].external_urls
            .spotify,
        },
        albumTitle: spotifyTrackData.tracks.items[0].album.name,
        image: spotifyTrackData.tracks.items[0].album.images[0].url,
      };
      const refinedTrack: LastFmTrack =
        await refineSpotifyTracksIntoLastFmTrack(spotifyTrack);
      return [refinedTrack];

    default:
      throw new Error("Invalid query parameter.");
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    throw new Error("Query parameter is required.");
  }
  let tracksToProcess = await fetchTrackListByQueryType(query, req);
  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack, index) => {
      const trackDetail = await lastFmFetcher.fetchTrackDetail(track);

      const id = generateTrackId(trackDetail.track.url);
      const youtubeId = await fetchYouTubeVideoId(trackDetail.track.url);
      const spotifyData = await fetchSpotifyTrackData(track.name);
      return {
        key: id,
        rank: index,
        id,
        trackTitle: decodeURIComponent(track.name),
        artist: decodeURIComponent(track.artist.name),
        youtubeId,
        albumTitle:
          spotifyData.tracks.items[0].album.name ||
          trackDetail.album?.title ||
          "",
        albumImgUrl: spotifyData.tracks.items[0].album.images[0].url,
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const resolvedTrackDetails = await Promise.all(trackDetailsPromises);
  const allTrackDetailsWithYoutube = resolvedTrackDetails.filter(
    (track) => track && track.youtubeId
  );
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
