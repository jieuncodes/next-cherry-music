import { NextResponse } from "next/server";
import { fetchCherryMusicTracks } from "../cherryMusic/track/service";
import { supabase } from "@/lib/server/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const partOfTodayTop50 = await fetchCherryMusicTracks({
    query: "top",
    count: 20,
  });
  const { data, error } = await supabase
    .from("todayTop")
    .upsert(partOfTodayTop50)
    .select();

  if (error) throw error;
  console.log(`** ${partOfTodayTop50.length} has uploaded on the Supabase`);

  return NextResponse.json({ ok: true });
}
