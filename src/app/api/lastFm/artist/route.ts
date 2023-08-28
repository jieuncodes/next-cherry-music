import { handleError } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import fetchFromLastFM, { FetchFromLastFMParamsProps } from "../handler";

export async function GET(req: NextRequest, res: NextResponse) {
  const artist = req.nextUrl.searchParams.get("artist");
  const method = req.nextUrl.searchParams.get("method");
  try {
    const params: FetchFromLastFMParamsProps = {
      method: `artist.${method}`,
      artist: artist as string,
      autocorrect: "1",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    };

    const data = await fetchFromLastFM(params);
    return NextResponse.json(data);
  } catch (error) {
    handleError({ context: `lastFm API artist.${method}`, error });
  }
}
