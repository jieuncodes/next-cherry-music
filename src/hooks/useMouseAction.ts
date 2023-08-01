import { progressBarDraggingState } from "@/atoms";
import { calculatePercentage, isValidPlayer } from "@/lib/utils";
import { RefObject, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";

interface useMouseActionProps {
  playerRef: RefObject<YouTubePlayer>;
  progressBarRef: RefObject<HTMLDivElement>;
}

function useMouseAction({ playerRef, progressBarRef }: useMouseActionProps) {
  const [isDragging, setIsDragging] = useRecoilState(progressBarDraggingState);
  const [draggingProgress, setDraggingProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  let duration: number = 0;
  if (isValidPlayer(playerRef)) {
    duration = playerRef.current.getDuration();
  }

  const handleMouseDown = (event: MouseEvent) => {
    const newPercentage = calculatePercentage(event, progressBarRef);
    setPercentage(newPercentage);
    setDraggingProgress(newPercentage);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    console.log("setIsDragging", isDragging);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setIsDragging(true);
    const newPercentage = calculatePercentage(event, progressBarRef);
    setPercentage(newPercentage);
    setDraggingProgress(newPercentage);
  };

  const handleMouseUp = () => {
    console.log("mouseUP");
    playerRef.current?.seekTo((percentage / 100) * duration, true);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    draggingProgress,
  };
}
export default useMouseAction;
