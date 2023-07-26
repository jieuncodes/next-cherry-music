import { floatToTime } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";

interface ProgressBarProps {
  playerRef: YouTubePlayer;
}

function ProgressBar({ playerRef }: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();

        setCurrentTime(floatToTime(currentTime / 60));
        setDuration(floatToTime(duration / 60));
        const percentage = (currentTime / duration) * 100;
        setProgress(percentage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playerRef]);

  return (
    <div className="flex flex-col mt-3 gap-1">
      <Progress
        ref={progressBarRef}
        aria-label="Music progress"
        classNames={{
          indicator: "bg-default-800 dark:bg-white",
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
