import { localStoragePlaylist, playerReadyStateAtom } from "@/atoms";
import { usePlayerProgress } from "@/hooks/useTrackProgress";
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
  const progressBarRef = useRef(null);
  const { currentTime, duration, progress } = usePlayerProgress(playerRef);

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
