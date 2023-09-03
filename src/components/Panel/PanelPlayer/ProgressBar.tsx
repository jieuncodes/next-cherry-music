import { progressBarDraggingState } from "@/atoms";
import useMouseAction from "@/hooks/useMouseAction";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { cn, floatToTime } from "@/lib/utils/utils";
import { Progress } from "@nextui-org/react";
import { RefObject, useRef } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";

interface ProgressBarProps {
  playerRef: RefObject<YouTubePlayer>;
  isPlayBar?: boolean;
}

function ProgressBar({ playerRef, isPlayBar }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useRecoilState(progressBarDraggingState);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const { onMouseDown, onMouseUp, draggingProgress } = useMouseAction({
    playerRef,
    progressBarRef,
  });

  const { duration, currentTime } = usePlayerProgress({
    playerRef,
  });
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
            isPlayBar ? "bg-pink-500" : "bg-default-800"
          } dark:bg-white`,
          track: ` ${isPlayBar ? "bg-pink-500/30" : "bg-default-500/30"}`,
        }}
        color="default"
        size="sm"
        value={
          isDragging ? draggingProgress : (currentTime / duration) * 100 || 0
        }
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      {!isPlayBar && (
        <div className="flex justify-between">
          <p className="text-small">{floatToTime(currentTime / 60)}</p>
          <p className="text-small text-foreground/50">
            {floatToTime(duration / 60)}
          </p>
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
