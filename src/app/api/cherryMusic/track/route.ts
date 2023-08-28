import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { LastFmTrack } from "@/types/lastFmTypes";
import { NextRequest, NextResponse } from "next/server";
import { lastFmFetcher } from "../../lastFm/fetcher";
import { fetchSpotifyTrackInfo } from "../../spotify/spotifyHelpers";
import { fetchTrackListByQueryType } from "./helper";
import { CherryTrack } from "@/types/itemTypes";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");
  const rawOffset = req.nextUrl.searchParams.get("offset");
  const rawCount = req.nextUrl.searchParams.get("count");
  const offset = rawOffset ? Number(rawOffset) : null;
  const count = rawCount ? Number(rawCount) : null;

  if (count && isNaN(count)) {
    throw new Error("Invalid count parameter.");
  }
  if (!query) {
    throw new Error("Query parameter is required.");
  }

  console.time("fetchTrackListByQueryType");
  let tracksToProcess = await fetchTrackListByQueryType(
    { query, offset, count },
    req
  );
  console.timeEnd("fetchTrackListByQueryType");

  console.time("trackDetailsPromises");
  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack, index): Promise<CherryTrack> => {
      const lastFmTrackDetail = await lastFmFetcher.fetchTrackDetail(track);
      const [youtubeId, spotifyData] = await Promise.all([
        fetchYouTubeVideoId(lastFmTrackDetail.track.url),
        fetchSpotifyTrackInfo(track.name),
      ]);
      const spotifyTrack = spotifyData.tracks?.items?.[0];
      return {
        key: index + "",
        rank: index,
        trackTitle: decodeURIComponent(track.name),
        artist: decodeURIComponent(track.artist.name),
        youtubeId,
        albumTitle:
          lastFmTrackDetail.album?.title || spotifyTrack?.album?.name || "",
        albumImgUrl:
          spotifyTrack?.album?.images[0].url ||
          "/images/default_album_cover.webp",
        tags: lastFmTrackDetail.track?.toptags?.tag || [],
        playCount: lastFmTrackDetail.track.playcount,
        wiki: lastFmTrackDetail.track.wiki,
      };
    }
  );
  console.timeEnd("trackDetailsPromises");

  const resolvedTrackDetails = await Promise.all(trackDetailsPromises);
  const allTrackDetailsWithYoutube = resolvedTrackDetails.filter(
    (track) => track && track.youtubeId
  );
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
