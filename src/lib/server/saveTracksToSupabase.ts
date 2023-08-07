import { supabase } from "@/lib/server/client";
import { Track } from "@/lib/server/database.types";
import { Dispatch } from "react";

interface SaveTracksProps {
  tracks: Track[];
  setIsSaved: Dispatch<boolean>;
}

async function saveTracksToSupabase({ tracks, setIsSaved }: SaveTracksProps) {
  const { data: existingTracks, error } = await supabase
    .from("tracks")
    .select("id");
  if (error) {
    console.error("Error fetching tracks from Supabase:", error);
    return;
  }
  const existingTrackIds = new Set(existingTracks?.map((t) => t.id));

  const tracksToInsert = tracks.filter(
    (track) => !existingTrackIds.has(track.id) && track.youtubeId
  );
  for (const track of tracksToInsert) {
    const { error: insertError } = await supabase.from("tracks").insert(track);
    if (insertError) {
      console.error("Error saving track to Supabase:", insertError);
      return;
    }
  }

  setIsSaved(true);
}

export default saveTracksToSupabase;
