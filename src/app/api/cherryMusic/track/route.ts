import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { LastFmTrack } from "@/types/lastFmTypes";
import { NextRequest, NextResponse } from "next/server";
import { lastFmFetcher } from "../../lastFm/fetcher";
import { fetchSpotifyTrackInfo } from "../../spotify/spotifyHelpers";
import { fetchTrackListByQueryType } from "./helper";
import { CherryTrack } from "@/types/itemTypes";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    throw new Error("Query parameter is required.");
  }

  let tracksToProcess = await fetchTrackListByQueryType(query, req);
  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack, index): Promise<CherryTrack> => {
      const lastFmTrackDetail = await lastFmFetcher.fetchTrackDetail(track);
      const youtubeId = await fetchYouTubeVideoId(lastFmTrackDetail.track.url);
      const spotifyData = await fetchSpotifyTrackInfo(track.name);
      return {
        key: spotifyData.tracks.items[0].id,
        rank: index,
        trackTitle: decodeURIComponent(track.name),
        artist: decodeURIComponent(track.artist.name),
        youtubeId,
        albumTitle:
          lastFmTrackDetail.album?.title ||
          spotifyData.tracks.items[0].album.name ||
          "",
        albumImgUrl: spotifyData.tracks.items[0].album.images[0].url,
        tags: lastFmTrackDetail.track?.toptags?.tag || [],
        playCount: lastFmTrackDetail.track.playcount,
        wiki: lastFmTrackDetail.track.wiki,
      };
    }
  );

  const resolvedTrackDetails = await Promise.all(trackDetailsPromises);
  const allTrackDetailsWithYoutube = resolvedTrackDetails.filter(
    (track) => track && track.youtubeId
  );
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
