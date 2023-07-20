"use client";
import { supabase } from "@/lib/server/client";
import { Database } from "@/lib/server/database.types";

export const fetchTracks = async () => {
  let { data: tracks, error } = await supabase
    .from("tracks")
    .select("id, artist, trackTitle, albumImgUrl")
    .not("albumImgUrl", "eq", null)
    .range(0, 27);

  if (error) {
    console.error(error);
    throw error;
  }

  return tracks as Database["public"]["Tables"]["tracks"]["Row"][];
};
