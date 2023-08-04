import {
  currTrackCurrentTimeAtom,
  currTrackDurationAtom,
  localStoragePlaylist,
  playerReadyStateAtom,
} from "@/atoms";
import { RefObject, useEffect, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState, useRecoilValue } from "recoil";

interface usePlayerProgressProps {
  playerRef: RefObject<YouTubePlayer>;
}

export const usePlayerProgress = ({ playerRef }: usePlayerProgressProps) => {
  const playlist = useRecoilValue(localStoragePlaylist);
  const isPlayerReady = useRecoilValue(playerReadyStateAtom);

  const [currentTime, setCurrentTime] = useRecoilState(
    currTrackCurrentTimeAtom
  );
  const [duration, setDuration] = useRecoilState(currTrackDurationAtom);
  const [youtubeProgress, setYoutubeProgress] = useState(0);

  const initProgress = () => {
    setYoutubeProgress(0);
    setCurrentTime(0);
    setDuration(0);
  };
  useEffect(() => {
    if (youtubeProgress === 0) {
      setCurrentTime(0);
    }
  }, [youtubeProgress]);

  useEffect(() => {
    if (playlist.length === 0) {
      initProgress();
    } else if (playlist.length > 0 && isPlayerReady && playerRef.current) {
      const interval = setInterval(() => {
        if (!playerRef || !playerRef.current) return;
        const currentTime = playerRef.current?.getCurrentTime();
        setDuration(playerRef.current.getDuration());
        setCurrentTime(currentTime);

        const percentage = (currentTime / duration) * 100;
        setYoutubeProgress(percentage);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [playerRef, isPlayerReady, playlist]);

  return { currentTime, duration, youtubeProgress, setYoutubeProgress };
};
