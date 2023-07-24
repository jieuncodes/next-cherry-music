import { supabase } from "@/lib/server/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let { data: tracks, error } = await supabase
      .from("tracks")
      .select("id, artist, trackTitle, albumImgUrl")
      .not("albumImgUrl", "eq", null)
      .range(0, 27);

    if (error) throw error;

    return NextResponse.json(tracks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tracks." });
  }
}
