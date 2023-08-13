import { handleError, validateEnvVariable } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  validateEnvVariable(process.env.LAST_FM_BASE_URL, "LAST_FM_BASE_URL");
  validateEnvVariable(process.env.LAST_FM_API_KEY, "LAST_FM_API_KEY");

  const album = req.nextUrl.searchParams.get("album");
  const artist = req.nextUrl.searchParams.get("artist");
  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
    const params = new URLSearchParams({
      method: "album.getinfo",
      artist: artist as string,
      album: album as string,
      autocorrect: "1",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    });

    url.search = params.toString();
    const response = await fetch(url);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    handleError({ context: "lastFm API - album.getinfo", error });
  }
}
