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
      return (x / rect.width) * 100;
    }
    return 0;
  };

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);

    setPercentage(getPercentageFromEvent(event));
    setDraggingProgress(percentage);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      setPercentage(getPercentageFromEvent(event));

      setDraggingProgress(percentage);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (percentage) {
        playerRef.current?.seekTo((percentage / 100) * duration, true);
      }
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
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
