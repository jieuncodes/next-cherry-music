import { NextResponse } from "next/server";
import { fetchCherryMusicTracks } from "../cherryMusic/track/service";
import { supabase } from "@/lib/server/client";
import { QueryTypes } from "@/types/itemTypes";

export const dynamic = "force-dynamic";

export async function GET() {
  const replaceWithNewData = async ({
    query,
    tableName,
  }: {
    query: QueryTypes;
    tableName: string;
  }) => {
    const { error: deleteError } = await supabase.from(tableName).delete();
    if (deleteError) throw Error(deleteError.message);

    const partOfWholeData = await fetchCherryMusicTracks({
      query,
      count: 20,
    });

    const { data, error: insertError } = await supabase
      .from(tableName)
      .insert([...partOfWholeData])
      .select();

    console.info("data has added to supabase", data);

    if (insertError) throw Error(insertError.message);

    console.info(`** ${partOfWholeData.length} has uploaded on the Supabase`);
  };

  await Promise.allSettled([
    replaceWithNewData({ query: "top", tableName: "todayTop" }),
    replaceWithNewData({ query: "koreatop", tableName: "koreaTop" }),
    replaceWithNewData({ query: "ustop", tableName: "usTop" }),
    replaceWithNewData({ query: "colombiatop", tableName: "colombiaTop" }),
  ]);

  return NextResponse.json({ ok: true });
}
