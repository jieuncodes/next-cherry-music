import { progressBarDraggingState } from "@/atoms";
import { usePlayerProgress } from "@/hooks/useTrackProgress";
import { cn } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { RefObject, useEffect, useRef } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";

interface ProgressBarProps {
  playerRef: RefObject<YouTubePlayer>;
  isPlayBar?: boolean;
}

function ProgressBar({ playerRef, isPlayBar }: ProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const { duration, currentTime, progress, setProgress } =
    usePlayerProgress(playerRef);
  const [isDragging, setIsDragging] = useRecoilState(progressBarDraggingState);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    const rect = progressBarRef?.current?.getBoundingClientRect();
    if (rect && rect.width) {
      const x = event.clientX - rect.left;
      const percentage = x / rect.width;
      setProgress(percentage * 100);
    }

    console.log("mouseDown");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const rect = progressBarRef?.current?.getBoundingClientRect();
      if (rect && rect.width) {
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setProgress(percentage);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const newTimeInSeconds =
        (progress * playerRef.current.getDuration()) / 100;
      playerRef.current?.seekTo(newTimeInSeconds, true);

      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

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
        aria-label="progress"
        classNames={{
          indicator: `${
            isPlayBar ? "bg-pink-500" : "bg-default-800 "
          } dark:bg-white`,
          track: ` ${isPlayBar ? "bg-pink-500/30" : "bg-default-500/30"}`,
        }}
        color="default"
        size="sm"
        value={progress}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
