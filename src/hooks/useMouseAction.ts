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
  if (hasValidPlayerMethods) {
    playerCurrTime = playerRef.current.getCurrentTime();
  }

  const [draggingProgress, setDraggingProgress] = useState(playerCurrTime || 0);

  let percentage: number;

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);

    const rect = progressBarRef.current?.getBoundingClientRect();
    if (rect && rect.width) {
      const x = event.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setDraggingProgress(percentage);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    console.log("mouseDown");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const rect = progressBarRef.current?.getBoundingClientRect();
      if (rect && rect.width) {
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setDraggingProgress(percentage);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      playerRef.current?.seekTo(percentage, true); //not working
      setIsDragging(false);
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
