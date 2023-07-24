import { Track } from "@/lib/server/database.types";
import { handleError } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSupabaseTracks = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const fetchFromLastFmTopTracks = async () => {
    try {
      const lastFmTopTracks = await fetch("/api/lastFm/fetch-tracks");
      const allTrackInfo = await lastFmTopTracks.json();

      setTopTracks(allTrackInfo.allTrackInfo);
      fetchYoutubeIds(allTrackInfo.allTrackInfo);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const getYoutubeVideoId = async (trackTitle: string, artist: string) => {
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
    try {
      const response = await fetch("/api/supabase/save-to-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topTracks),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      handleError({ context: "saving to Supabase", error });
      setIsSaved(false);
    }
  };

  useEffect(() => {
    fetchFromLastFmTopTracks();
    saveToSupabase();
  }, []);

  return {
    isSaved,
    topTracks,
  };
};
