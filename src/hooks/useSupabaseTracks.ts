import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";

export const useSupabaseTracks = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  //for debug
  useEffect(() => {
    console.log("topTracks updated:", topTracks);
  }, [topTracks]);

  const fetchFromLastFmTopTracks = async () => {
    try {
      const lastFmTopTracks = await fetch("/api/lastFm/fetch-tracks");
      const allTrackInfo = await lastFmTopTracks.json();

      setTopTracks(allTrackInfo);
      fetchYoutubeIds(allTrackInfo);
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
    const updatedTracks = [];

    for (let track of tracks) {
      const videoId = await getYoutubeVideoId(track.trackTitle!, track.artist!);
      if (videoId) {
        track.youtubeId = videoId;
      }
      updatedTracks.push(track);
    }

    setTopTracks(updatedTracks);
  };

  const saveToSupabase = async () => {
    try {
      setIsSaved(true);
    } catch (error) {
      setIsSaved(false);
    }
  };

  useEffect(() => {
    fetchFromLastFmTopTracks();
  }, []);

  return {
    isSaved,
    topTracks,
  };
};
