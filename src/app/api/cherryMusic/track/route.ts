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
import { fetchSpotifyTrackData } from "../../spotify/fetch-track-img/route";
import {
  fetchSpotifyTopTracks,
  refineSpotifyTracksIntoLastFmTrack,
} from "../../spotify/service";

async function fetchTrackListByQueryType(
  query: string,
  req: NextRequest
): Promise<LastFmTrack[]> {
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
      const artist = req.nextUrl.searchParams.get("artist");
      if (!artist) {
        throw new Error("Artist name is required for artist-top query.");
      }
      return await fetchArtistTopTracks(artist);

    case "tag-top":
      const tag = req.nextUrl.searchParams.get("tag");
      if (!tag) {
        throw new Error("Tag name is required for tag-top query.");
      }
      return await fetchTagTopTracks(tag);

    case "album-tracks":
      const album = req.nextUrl.searchParams.get("album");
      const artistName = req.nextUrl.searchParams.get("artist");
      console.log("", album, artistName);
      if (!album || !artistName) {
        throw new Error(
          "Album and artist name are required for album-tracks query."
        );
      }
      const albumInfo = await fetchAlbumInfo({ artist: artistName, album });
      return albumInfo.tracks.track;

    default:
      throw new Error("Invalid query parameter.");
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("cherrt");
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    throw new Error("Query parameter is required.");
  }

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
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: spotifyData.tracks.items[0].album.images[0].url,
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const allTrackDetailsWithYoutube = await Promise.all(trackDetailsPromises);

  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
