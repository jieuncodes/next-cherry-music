import { NextResponse } from "next/server";
import { fetchCherryMusicTracks } from "../cherryMusic/track/service";
import { supabase } from "@/lib/server/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const partOfTodayTop50 = await fetchCherryMusicTracks({
    query: "top",
    count: 20,
  });

  const { error: supabaseDeleteError } = await supabase
    .from("todayTop")
    .delete();

  const { data, error: supabaseInsertError } = await supabase
    .from("todayTop")
    .insert([...partOfTodayTop50])
    .select();

  if (supabaseDeleteError) throw Error(supabaseDeleteError.message);
  if (supabaseInsertError) throw Error(supabaseInsertError.message);

  console.log(`** ${partOfTodayTop50.length} has uploaded on the Supabase`);

  return NextResponse.json({ ok: true });
}
