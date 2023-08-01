import { localStoragePlaylist, playerReadyStateAtom } from "@/atoms";
import { floatToTime, isValidPlayer } from "@/lib/utils";
import { RefObject, useEffect, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilValue } from "recoil";

interface usePlayerProgressProps {
  playerRef: RefObject<YouTubePlayer>;
  progressBarRef: RefObject<HTMLDivElement>;
  isDragging: boolean;
}

export const usePlayerProgress = ({
  playerRef,
  progressBarRef,
  isDragging,
}: usePlayerProgressProps) => {
  const playlist = useRecoilValue(localStoragePlaylist);
  const isPlayerReady = useRecoilValue(playerReadyStateAtom);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [youtubeProgress, setYoutubeProgress] = useState(0);

  const initProgress = () => {
    setYoutubeProgress(0);
    setCurrentTime("0:00");
    setDuration("0:00");
  };

  useEffect(() => {
    if (playlist.length === 0) {
      initProgress();
    } else if (playlist.length > 0 && isPlayerReady && playerRef.current) {
      if (!isValidPlayer(playerRef) || isDragging) return;

      const interval = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();

        setCurrentTime(floatToTime(currentTime / 60));
        setDuration(floatToTime(duration / 60));

        const percentage = (currentTime / duration) * 100;
        setYoutubeProgress(percentage);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [playerRef, isPlayerReady, playlist]);

  return { currentTime, duration, youtubeProgress, setYoutubeProgress };
};
