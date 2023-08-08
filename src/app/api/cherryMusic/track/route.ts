import { generateTrackId } from "@/lib/utils";
import { LastFmTrack } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchArtistTopTracks,
  fetchTopTracks,
  fetchTrackDetail,
} from "../../lastFm/service";
import { fetchYoutubeId } from "../../youtube/service";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    throw new Error("Query parameter is required.");
  }
  console.log("query", query);
  let tracksToProcess;

  if (query === "top") {
    tracksToProcess = await fetchTopTracks();
  } else if (query === "artist-top") {
    const artist = req.nextUrl.searchParams.get("artist");
    console.log("params artist:", artist);
    if (!artist)
      throw new Error("Artist name is required for artist-top query.");
    tracksToProcess = await fetchArtistTopTracks(artist);
  } else {
    throw new Error("Invalid query parameter.");
  }
  console.log("", tracksToProcess);

  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack) => {
      const trackDetail = await fetchTrackDetail(track);
      const id = generateTrackId(trackDetail.url);
      const youtubeId = await fetchYoutubeId(query, track, String(id));
      return {
        id,
        trackTitle: track.name,
        artist: track.artist.name,
        youtubeId,
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const allTrackDetailsWithYoutube = await Promise.all(trackDetailsPromises);
  console.log("allTrackDetailsWithYoutube", allTrackDetailsWithYoutube);
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
