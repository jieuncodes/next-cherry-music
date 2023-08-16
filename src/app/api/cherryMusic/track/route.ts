import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { generateTrackId } from "@/lib/utils";
import { LastFmTrack } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchAlbumInfo,
  fetchArtistTopTracks,
  fetchTrackDetail,
} from "../../lastFm/service";
import { fetchTagTopTracks } from "../../lastFm/tag/services";
import { fetchSpotifyTrackData } from "../../spotify/track/route";
import {
  fetchSpotifyTopTracks,
  refineSpotifyTracksIntoLastFmTrack,
} from "../../spotify/service";
import { SpotifyTrackData } from "@/types/spotify/types";

async function fetchTrackListByQueryType(
  query: string,
  req: NextRequest
): Promise<LastFmTrack[]> {
  const artist = req.nextUrl.searchParams.get("artist");
  const tag = req.nextUrl.searchParams.get("tag");
  const album = req.nextUrl.searchParams.get("album");
  const trackTitle = req.nextUrl.searchParams.get("track");

  switch (query) {
    case "top":
      const spotifyTop = await fetchSpotifyTopTracks();
      const refinedTracks: LastFmTrack[] = [];
      for (const track of spotifyTop) {
        const refined = await refineSpotifyTracksIntoLastFmTrack(track);
        refinedTracks.push(refined);
      }
      return refinedTracks;

    case "artist-top":
      if (!artist) {
        throw new Error("Artist name is required for artist-top query.");
      }
      return await fetchArtistTopTracks(artist);

    case "tag-top":
      if (!tag) {
        throw new Error("Tag name is required for tag-top query.");
      }
      return await fetchTagTopTracks(tag);

    case "album-tracks":
      if (!album || !artist) {
        throw new Error(
          "Album and artist name are required for album-tracks query."
        );
      }
      const albumInfo = await fetchAlbumInfo({ artist: artist, album });
      const tracksArray = Array.isArray(albumInfo.tracks.track)
        ? albumInfo.tracks.track
        : [albumInfo.tracks.track];
      return tracksArray;

    case "track":
      console.log("case track:", trackTitle);
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
  console.log("query@", query);

  let tracksToProcess = await fetchTrackListByQueryType(query, req);
  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack, index) => {
      const trackDetail = await fetchTrackDetail(track);
      const id = generateTrackId(trackDetail.url);
      const youtubeId = await fetchYouTubeVideoId(trackDetail.url);
      const spotifyData = await fetchSpotifyTrackData(track.name);
      return {
        rank: index,
        id,
        trackTitle: decodeURIComponent(track.name),
        artist: decodeURIComponent(track.artist.name),
        youtubeId,
        albumTitle: spotifyData.albumTitle || trackDetail.album?.title || "",
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
