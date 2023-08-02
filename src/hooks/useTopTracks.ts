import { isDataOld } from "./../lib/helpers";
import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/server/client";
import useLastFetchTime from "./useLastFetchTime";

function useTopTracks() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const { lastFetchTime, setLastFetchTime, isLastFetchStateLoading } =
    useLastFetchTime("topTracks");

  useEffect(() => {
    if (!isLastFetchStateLoading) {
      if (!lastFetchTime || isDataOld(lastFetchTime)) {
        fetchAndSave().then(() => setLastFetchTime(new Date()));
      }
    }
  }, [isLastFetchStateLoading]);

  const fetchAndSave = async () => {
    setIsLoading(true);
    const response = await fetch("/api/lastFm/top-tracks");
    const data = await response.json();

    const tracksWithYoutubeId = data.allTrackInfo.filter(
      (track: Track) => track.youtubeId
    );
    await saveTracksToSupabase(tracksWithYoutubeId);

    const fetchedTracks = await fetchTracksFromSupabase();
    setTopTracks(fetchedTracks);

    setIsLoading(false);
  };

  const saveTracksToSupabase = async (tracks: Track[]) => {
    for (const track of tracks) {
      const { data, error } = await supabase.from("tracks").upsert(track);
      if (error) {
        console.error("Error saving track to Supabase:", error);
      }
    }
    setIsSaved(true);
  };

  const fetchTracksFromSupabase = async () => {
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .filter("youtubeId", "neq", null);
    if (error) {
      console.error("Error fetching tracks from Supabase:", error);
      return [];
    }
    return data || [];
  };

  return { isSaved, isLoading, topTracks };
}

export default useTopTracks;
