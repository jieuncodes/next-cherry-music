import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyTrackInfo } from "../spotifyHelpers";

export async function GET(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams;
  const trackTitle = params.get("title") as string;
  const spotifyData = await fetchSpotifyTrackInfo(trackTitle);
  return NextResponse.json(spotifyData);
}
