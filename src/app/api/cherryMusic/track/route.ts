import { LastFmSearchResTrack, LastFmTrack } from "@/types/lastFmTypes";
import { NextRequest, NextResponse } from "next/server";
import { fetchTrackListByQueryType, processTrack } from "./helper";

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
  const tracksToProcess: (LastFmTrack | LastFmSearchResTrack)[] =
    await fetchTrackListByQueryType({ query, offset, count }, req);
  console.timeEnd("fetchTrackListByQueryType");

  console.time("trackDetailsPromises");
  const trackDetailsPromises = tracksToProcess.map((track, index) =>
    processTrack(track, index)
  );
  console.timeEnd("trackDetailsPromises");
  const resolvedTrackDetails = await Promise.all(trackDetailsPromises);
  const allTrackDetailsWithYoutube = resolvedTrackDetails.filter(
    (track) => track && track.youtubeId
  );
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
