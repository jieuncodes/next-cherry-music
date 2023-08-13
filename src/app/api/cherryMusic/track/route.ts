import { generateTrackId } from "@/lib/utils";
import { LastFmTrack } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchAlbumInfo,
  fetchArtistTopTracks,
  fetchTopTracks,
  fetchTrackDetail,
} from "../../lastFm/service";
import { fetchYoutubeId } from "../../youtube/service";
import { fetchTagTopTracks } from "../../lastFm/tag/services";

async function fetchTracksByQueryType(
  query: string,
  req: NextRequest
): Promise<LastFmTrack[]> {
  switch (query) {
    case "top":
      return await fetchTopTracks();

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
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    throw new Error("Query parameter is required.");
  }

  const tracksToProcess = await fetchTracksByQueryType(query, req);
  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack) => {
      const trackDetail = await fetchTrackDetail(track);
      const id = generateTrackId(trackDetail.url);
      const youtubeId = await fetchYoutubeId(query, track, String(id));
      return {
        id,
        trackTitle: decodeURIComponent(track.name),
        artist: decodeURIComponent(track.artist.name),
        youtubeId,
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const allTrackDetailsWithYoutube = await Promise.all(trackDetailsPromises);
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
