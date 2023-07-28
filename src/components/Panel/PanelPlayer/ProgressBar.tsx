import { playerReadyStateAtom } from "@/atoms";
import { cn, floatToTime } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilValue } from "recoil";

interface ProgressBarProps {
  playerRef: YouTubePlayer;
  isOnPlayBar?: boolean;
}

function ProgressBar({ playerRef, isOnPlayBar }: ProgressBarProps) {
  const isPlayerReady = useRecoilValue(playerReadyStateAtom);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (isPlayerReady) {
      const interval = setInterval(() => {
        if (playerRef) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();

          setCurrentTime(floatToTime(currentTime / 60));
          setDuration(floatToTime(duration / 60));
          const percentage = (currentTime / duration) * 100;
          setProgress(percentage);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [playerRef]);

  return (
    <div
      className={cn(
        "flex flex-col mt-3 gap-1",
        isOnPlayBar
          ? "absolute w-auto -mt-1 left-[63px] md:left-[72px] right-[30px] md:right-[37px]"
          : ""
      )}
    >
      <Progress
        ref={progressBarRef}
        aria-label="Music progress"
        classNames={{
          indicator: `${
            isOnPlayBar ? "bg-pink-500" : "bg-default-800 "
          } dark:bg-white`,
          track: ` ${isOnPlayBar ? "bg-pink-500/30" : "bg-default-500/30"}`,
        }}
        color="default"
        size="sm"
        value={progress}
      />
      {!isOnPlayBar && (
        <div className="flex justify-between">
          <p className="text-small">{currentTime}</p>
          <p className="text-small text-foreground/50">{duration}</p>
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
