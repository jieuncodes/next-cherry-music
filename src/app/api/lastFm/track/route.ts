import { handleError } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import fetchFromLastFM, { FetchFromLastFMParamsProps } from "../handler";

export async function GET(req: NextRequest, res: NextResponse) {
  const method = req.nextUrl.searchParams.get("method");
  const trackTitle = req.nextUrl.searchParams.get("trackTitle") || "";
  const artist = req.nextUrl.searchParams.get("artist") || "";
  try {
    const params: FetchFromLastFMParamsProps = {
      method: `track.${method}`,
      artist: artist,
      track: trackTitle,
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    };
    const data = await fetchFromLastFM(params);
    return NextResponse.json(data);
  } catch (error) {
    handleError({ context: `lastFm API track.${method}`, error });
  }
}
