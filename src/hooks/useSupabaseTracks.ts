import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";
import useTrackFetcher, {
  LastFmFetcher,
  SupabaseFetcher,
} from "./useTrackFetcher";
import { handleError, isDataOld } from "@/lib/helpers";

function useSupabaseTracks() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [supabaseTracks, setSupabaseTracks] = useState<Track[]>([]);
  const { topTracks: lastFmTopTracks } = useTrackFetcher(new LastFmFetcher());
  const { topTracks: supabaseTopTracks } = useTrackFetcher(
    new SupabaseFetcher()
  );
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let tracks;
      if (!lastFetchTime || isDataOld(lastFetchTime)) {
        tracks = await fetchFromLastFmAndSave();
        setLastFetchTime(new Date());
      } else {
        tracks = supabaseTopTracks;
      }
      setSupabaseTracks(tracks);
    } catch (error) {
      handleError({ context: "useSupabaseTracks", error });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromLastFmAndSave = async () => {
    const tracksWithYoutubeId = await setTracksWithYoutubeId(lastFmTopTracks);
    saveToSupabase(tracksWithYoutubeId);

    setIsSaved(true);
    return tracksWithYoutubeId;
  };

  const getYoutubeVideoId = async (
    trackTitle: string,
    artist: string
  ): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `/api/youtube?track=${trackTitle}&artist=${artist}`
      );
      const data = await response.json();
      return data.videoId;
    } catch (error) {
      console.error("Error fetching YouTube ID:", error);
      return;
    }
  };

  const setTracksWithYoutubeId = async (tracks: Track[]): Promise<Track[]> => {
    return await Promise.all(
      tracks.map(async (track) => {
        const videoId = await getYoutubeVideoId(
          track.trackTitle!,
          track.artist!
        );
        return {
          ...track,
          youtubeId: videoId ? videoId : "",
        };
      })
    );
  };

  const saveToSupabase = async (tracksWithYoutubeId: Track[]) => {
    if (!tracksWithYoutubeId) {
      return;
    }
    console.log("tracksWithYoutubeId", tracksWithYoutubeId);
    try {
      const response: Response = await fetch("/api/supabase/save-to-db", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(tracksWithYoutubeId),
      });

      const responseData = await response.json();
      setIsSaved(responseData.success);
    } catch (error) {
      handleError({ context: "saving to Supabase", error });
      setIsSaved(false);
    }
  };

  return {
    isSaved,
    isLoading,
    supabaseTracks,
  };
}
export default useSupabaseTracks;
