import { fetchLastFmTopTracks } from "./../app/api/lastFm/fetch-tracks/route";
import { topTracksLastFetchTime } from "@/atoms";
import { Track } from "@/lib/server/database.types";
import { handleError } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSupabaseTracks = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  const REFRESH_TERM_MILLISECOND = 6 * 60 * 60 * 1000;

  useEffect(() => {
    console.log("lastfetchtime", lastFetchTime);
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      await fetchTopTracks();
      if (isDataOld()) {
        await saveToSupabase();
      }
    } catch (error) {
      handleError({ context: "useSupabaseTracks", error });
    } finally {
      setIsLoading(false);
    }
  };

  const isDataOld = (): boolean => {
    return lastFetchTime &&
      new Date().getTime() - lastFetchTime.getTime() < REFRESH_TERM_MILLISECOND
      ? true
      : false;
  };

  const fetchFromLastFm = async (): Promise<Track[]> => {
    const response = await fetch("/api/lastFm/fetch-tracks");
    const data = await response.json();
    return data.allTrackInfo;
  };

  const fetchFromSupabase = async (): Promise<Track[]> => {
    const response = await fetch("/api/supabase/get-from-db");
    return await response.json();
  };

  const fetchTopTracks = async () => {
    try {
      if (isDataOld()) {
        const lastFmTopTracks = await fetchFromLastFm();
        setLastFetchTime(new Date());

        setTopTracks(lastFmTopTracks);
        await fetchYoutubeIds(lastFmTopTracks);
      } else {
        const dbTopTracks: Track[] = await fetchFromSupabase();
        setTopTracks(dbTopTracks);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
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

  const fetchYoutubeIds = async (tracks: Track[]) => {
    const updatedTracks = await Promise.all(
      tracks.map(async (track) => {
        const videoId = await getYoutubeVideoId(
          track.trackTitle!,
          track.artist!
        );
        if (videoId) {
          track.youtubeId = videoId;
        }
        return track;
      })
    );

    setTopTracks(updatedTracks);
  };

  const saveToSupabase = async () => {
    console.log("saveToSupabase with:", topTracks);
    if (!topTracks) {
      console.log("topTracks is empty");
      return;
    }
    try {
      console.log("toptracks", topTracks);
      const response: Response = await fetch("/api/supabase/save-to-db", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(topTracks),
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
    topTracks,
  };
};
