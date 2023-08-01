import { RefObject, useState } from "react";
import { YouTubePlayer } from "react-youtube";

interface useMouseActionProps {
  playerRef: RefObject<YouTubePlayer>;
  progressBarRef: RefObject<HTMLDivElement>;
}

function useMouseAction({ playerRef, progressBarRef }: useMouseActionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const hasValidPlayerMethods =
    playerRef.current && typeof playerRef.current.getCurrentTime === "function";

  let playerCurrTime;
  let duration: number;
  if (hasValidPlayerMethods) {
    playerCurrTime = playerRef.current.getCurrentTime();
    duration = playerRef.current.getDuration();
  }

  const [draggingProgress, setDraggingProgress] = useState(playerCurrTime || 0);

  const [percentage, setPercentage] = useState(0);

  const getPercentageFromEvent = (event: MouseEvent): number => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    if (rect && rect.width) {
      const x = event.clientX - rect.left;
      console.log("(x / rect.width) * 100", (x / rect.width) * 100);
      return (x / rect.width) * 100;
    }
    return 0;
  };
  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);

    const newPercentage = getPercentageFromEvent(event);
    console.log("on mouse down ", newPercentage);
    setPercentage(newPercentage);

    setDraggingProgress(newPercentage);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    console.log("mouseDown");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const newPercentage = getPercentageFromEvent(event);
      setPercentage(newPercentage);

      setDraggingProgress(newPercentage);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      console.log("UP percentage:", percentage);
      playerRef.current?.seekTo((percentage / 100) * duration, true);
      document.removeEventListener("mousemove", handleMouseMove);
      console.log("mouseUp");
    }
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
