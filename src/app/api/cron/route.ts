import { NextResponse } from "next/server";
import { fetchCherryMusicTracks } from "../cherryMusic/track/service";
import { supabase } from "@/lib/server/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const replaceWithNewData = async ({
    query,
    tableName,
  }: {
    query: "top" | "koreatop" | "ustop" | "colombiatop";
    tableName: string;
  }) => {
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .neq("id", 0);

    const partOfWholeData = await fetchCherryMusicTracks({
      query,
      count: 20,
    });

    const { data, error: insertError } = await supabase
      .from(tableName)
      .insert([...partOfWholeData])
      .select();

    if (deleteError) throw Error(deleteError.message);
    if (insertError) throw Error(insertError.message);

    console.log(`** ${partOfWholeData.length} has uploaded on the Supabase`);
  };

  replaceWithNewData({ query: "top", tableName: "todayTop" });

  return NextResponse.json({ ok: true });
}
