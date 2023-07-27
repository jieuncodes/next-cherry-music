import { currTrackCurrentTimeAtom, currTrackDurationAtom } from "@/atoms";
import { cn, floatToTime } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";

interface ProgressBarProps {
  playerRef: YouTubePlayer;
  isOnPlayBar?: boolean;
}

function ProgressBar({ playerRef, isOnPlayBar }: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useRecoilState(
    currTrackCurrentTimeAtom
  );
  const [duration, setDuration] = useRecoilState(currTrackDurationAtom);
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef) {
        const currentTime = playerRef?.current.getCurrentTime();
        const duration = playerRef?.current.getDuration();

        setCurrentTime(floatToTime(currentTime / 60));
        setDuration(floatToTime(duration / 60));
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [playerRef]);

  return (
    <div
      className={cn(
        "flex flex-col mt-3 gap-1 mb-5",
        isOnPlayBar
          ? "absolute w-auto mb-0 -mt-1 left-[63px] md:left-[72px] right-[30px] md:right-[37px]"
          : ""
      )}
    >
      <Progress
        ref={progressBarRef}
        aria-label="Music progress"
        classNames={{
          indicator: cn(
            "bg-default-800 dark:bg-white",
            isOnPlayBar ? "bg-[#ff5879c6]" : ""
          ),
          track: "bg-default-500/30",
        }}
        color="default"
        size="sm"
        value={progress}
      />
      <div className="flex justify-between">
        <p className="text-small">{currentTime}</p>
        <p className="text-small text-foreground/50">{duration}</p>
      </div>
    </div>
  );
}
export default ProgressBar;
