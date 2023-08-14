import { handleError, validateEnvVariable } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  validateEnvVariable(process.env.LAST_FM_BASE_URL, "LAST_FM_BASE_URL");
  validateEnvVariable(process.env.LAST_FM_API_KEY, "LAST_FM_API_KEY");

  try {
    const url = new URL(process.env.LAST_FM_BASE_URL!);
    const params = new URLSearchParams({
      method: "user.getTopTracks",
      user: "Enono18",
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    });

    url.search = params.toString();

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.toptracks.track);
  } catch (error) {
    handleError({ context: "lastFm API - geo.getTopTracks", error });
  }
}
