import { RefObject, useEffect, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilValue } from "recoil";
import { localStoragePlaylist, playerReadyStateAtom } from "@/atoms";
import { floatToTime } from "@/lib/utils";

export const usePlayerProgress = (playerRef: RefObject<YouTubePlayer>) => {
  const isPlayerReady = useRecoilValue(playerReadyStateAtom);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const playlist = useRecoilValue(localStoragePlaylist);

  useEffect(() => {
    if (playlist.length === 0) {
      setProgress(0);
      setCurrentTime("0:00");
      setDuration("0:00");
    } else if (playlist.length > 0 && isPlayerReady && playerRef.current) {
      const interval = setInterval(() => {
        if (
          !playerRef.current ||
          typeof playerRef.current.getCurrentTime !== "function" ||
          typeof playerRef.current.getDuration !== "function"
        ) {
          return;
        }
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();

        setCurrentTime(floatToTime(currentTime / 60));
        setDuration(floatToTime(duration / 60));
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [playerRef, isPlayerReady, playlist]);

  return { currentTime, duration, progress };
};
