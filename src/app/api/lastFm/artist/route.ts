import { handleError, validateEnvVariable } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  validateEnvVariable(process.env.LAST_FM_BASE_URL, "LAST_FM_BASE_URL");
  validateEnvVariable(process.env.LAST_FM_API_KEY, "LAST_FM_API_KEY");

  const artist = req.nextUrl.searchParams.get("artist");
  const mbid = req.nextUrl.searchParams.get("mbid");
  const lang = req.nextUrl.searchParams.get("lang");
  console.log("api", artist);

  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
    const params = new URLSearchParams({
      method: "artist.getInfo",
      artist: artist as string,
      autocorrect: "1",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    });
    1;
    url.search = params.toString();
    const response = await fetch(url);

    const data = await response.json();
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    handleError({ context: "lastFm API", error });
  }
}
