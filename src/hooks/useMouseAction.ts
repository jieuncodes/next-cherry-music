import { currTrackDurationAtom, progressBarDraggingState } from "@/atoms";
import { calculatePercentage } from "@/lib/utils";
import { RefObject, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState, useRecoilValue } from "recoil";

interface useMouseActionProps {
  playerRef: RefObject<YouTubePlayer>;
  progressBarRef: RefObject<HTMLDivElement>;
}

function useMouseAction({ playerRef, progressBarRef }: useMouseActionProps) {
  const [isDragging, setIsDragging] = useRecoilState(progressBarDraggingState);
  const [draggingProgress, setDraggingProgress] = useState(0);
  const uiPercentageRef = useRef(0);

  const duration = useRecoilValue(currTrackDurationAtom);

  const onMouseDown = (event: MouseEvent) => {
    const newPercentage = calculatePercentage(event, progressBarRef);
    uiPercentageRef.current = newPercentage;
    setDraggingProgress(newPercentage);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setIsDragging(true);
    const newPercentage = calculatePercentage(event, progressBarRef);
    uiPercentageRef.current = newPercentage;
    setDraggingProgress(newPercentage);
  };

  const onMouseUp = () => {
    playerRef.current?.seekTo((uiPercentageRef.current / 100) * duration, true);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setIsDragging(false);
  };

  return {
    isDragging,
    onMouseDown,
    handleMouseMove,
    onMouseUp,
    draggingProgress,
  };
}
export default useMouseAction;
