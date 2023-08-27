import { NextResponse } from "next/server";
import { fetchCherryMusicTracks } from "../cherryMusic/track/service";
import { supabase } from "@/lib/server/client";

export async function GET() {
  const todayTop50 = await fetchCherryMusicTracks({ query: "top" });

  const { data, error } = await supabase
    .from("todayTop")
    .upsert(todayTop50)
    .select();

  if (error) throw error;

  return NextResponse.json({ ok: true });
}
