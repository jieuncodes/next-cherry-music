import { localStoragePlaylist, playerReadyStateAtom } from "@/atoms";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { cn, floatToTime } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilValue } from "recoil";

interface ProgressBarProps {
  playerRef: RefObject<YouTubePlayer>;
  isPlayBar?: boolean;
}

function ProgressBar({ playerRef, isPlayBar }: ProgressBarProps) {
  const isPlayerReady = useRecoilValue(playerReadyStateAtom);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);
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

  return (
    <div
      className={cn(
        "flex flex-col mt-3 gap-1 mb-3",
        isPlayBar
          ? "absolute w-auto -mt-1 left-[63px] md:left-[72px] right-[30px] md:right-[37px] mb-0"
          : ""
      )}
    >
      <Progress
        ref={progressBarRef}
        aria-label="Music progress"
        classNames={{
          indicator: `${
            isPlayBar ? "bg-pink-500" : "bg-default-800 "
          } dark:bg-white`,
          track: ` ${isPlayBar ? "bg-pink-500/30" : "bg-default-500/30"}`,
        }}
        color="default"
        size="sm"
        value={progress}
      />
      {!isPlayBar && (
        <div className="flex justify-between">
          <p className="text-small">{currentTime}</p>
          <p className="text-small text-foreground/50">{duration}</p>
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
