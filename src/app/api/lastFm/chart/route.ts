import { handleError } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import fetchFromLastFM, { FetchFromLastFMParamsProps } from "../handler";

export async function GET(req: NextRequest, res: NextResponse) {
  const method = req.nextUrl.searchParams.get("method");

  try {
    const params: FetchFromLastFMParamsProps = {
      method: `chart.${method}`,
      api_key: process.env.LAST_FM_API_KEY!,
      format: "json",
    };

    const data = await fetchFromLastFM(params);
    return NextResponse.json(data);
  } catch (error) {
    handleError({ context: `lastFm API chart.${method}`, error });
  }
}
