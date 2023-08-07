import { handleError, isDataOld } from "../lib/helpers";
import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";
import useLastFetchTime from "./supabase/useLastFetchTime";
import saveTracksToSupabase from "../lib/server/saveTracksToSupabase";
import fetchFromSupabase from "@/lib/server/fetchFromSupabase";

function useTopTracks() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const { lastFetchTime, setLastFetchTime, isLastFetchStateLoading } =
    useLastFetchTime("topTracks");

  useEffect(() => {
    const saveAndFetch = async () => {
      setIsLoading(true);
      try {
        const topTracksResponse = await fetch(
          "/api/cherryMusic/track?query=top"
        );
        if (!topTracksResponse.ok) {
          throw new Error(topTracksResponse.statusText);
        }

        const topTracksList = await topTracksResponse.json();
        const cherryTopTracks = topTracksList;
        console.log("cherryTopTracks", cherryTopTracks);
        await saveTracksToSupabase({
          tracks: cherryTopTracks,
          setIsSaved,
        });

        const supabaseTopData = await fetchFromSupabase(topTracksList);
        setTopTracks(supabaseTopData);
      } catch (error) {
        handleError({ context: "Error fetching top tracks:", error });
      } finally {
        setIsLoading(false);
        setLastFetchTime(new Date());
      }
    };
    if (!isLastFetchStateLoading) {
      if (!lastFetchTime || isDataOld(lastFetchTime)) {
        saveAndFetch();
      }
    }
  }, [isLastFetchStateLoading]);

  return { isSaved, isLoading, topTracks };
}

export default useTopTracks;
