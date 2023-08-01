import useMouseAction from "@/hooks/useMouseAction";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { cn } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { RefObject, useRef } from "react";
import { YouTubePlayer } from "react-youtube";

interface ProgressBarProps {
  playerRef: RefObject<YouTubePlayer>;
  isPlayBar?: boolean;
}

function ProgressBar({ playerRef, isPlayBar }: ProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const { isDragging, handleMouseDown, handleMouseUp, draggingProgress } =
    useMouseAction({
      playerRef,
      progressBarRef,
    });

  const { duration, currentTime, youtubeProgress, setYoutubeProgress } =
    usePlayerProgress({
      playerRef,
      progressBarRef,
      isDragging,
    });

  const uiProgress = isDragging ? draggingProgress : youtubeProgress;
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
        disableAnimation={true}
        classNames={{
          indicator: `${
            isPlayBar ? "bg-pink-500" : "bg-default-800 "
          } dark:bg-white`,
          track: ` ${isPlayBar ? "bg-pink-500/30" : "bg-default-500/30"}`,
        }}
        color="default"
        size="sm"
        value={uiProgress}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
