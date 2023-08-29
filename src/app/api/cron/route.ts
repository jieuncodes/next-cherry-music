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
    console.log("partOfWholeData", partOfWholeData);

    const { data, error: insertError } = await supabase
      .from(tableName)
      .insert([...partOfWholeData])
      .select();

    console.log("data has added to supabase", data);

    if (deleteError) throw Error(deleteError.message);
    if (insertError) throw Error(insertError.message);

    console.log(`** ${partOfWholeData.length} has uploaded on the Supabase`);
  };

  await Promise.all([
    replaceWithNewData({ query: "top", tableName: "todayTop" }),
    replaceWithNewData({ query: "koreatop", tableName: "koreaTop" }),
    replaceWithNewData({ query: "ustop", tableName: "usTop" }),
    replaceWithNewData({ query: "colombiatop", tableName: "colombiaTop" }),
  ]);

  return NextResponse.json({ ok: true });
}
