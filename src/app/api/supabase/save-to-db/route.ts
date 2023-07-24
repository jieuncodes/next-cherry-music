import { supabase } from "@/lib/server/client";
import { Track } from "@/lib/server/database.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const trackInfo: Track[] = await request.json();

  try {
    const { data, error } = await supabase
      .from("tracks")
      .insert([...trackInfo]);

    if (data) {
      return NextResponse.json({ success: true });
    }
    if (error) {
      console.error("Error saving to Supabase:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
