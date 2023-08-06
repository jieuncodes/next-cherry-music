import { supabase } from "@/lib/server/client";
import { Track } from "@/lib/server/database.types";

async function fetchFromSupabase(tracksToFetch: Track[]) {
  const ids = tracksToFetch.map((track) => track.id);

  let { data, error } = await supabase
    .from("tracks")
    .select("*")
    .in("id", ids)
    .filter("youtubeId", "neq", null);

  if (error) {
    console.error("Error fetching tracks from Supabase:", error);
    return [];
  }
  return data || [];
}
export default fetchFromSupabase;
