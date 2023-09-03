import { currTrackDurationAtom, progressBarDraggingState } from "@/atoms";
import { CustomMouseEvent, calculatePercentage } from "@/lib/utils/utils";
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

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const customEvent: CustomMouseEvent = {
      clientX: event.clientX,
      target: event.currentTarget,
    };

    const newPercentage = calculatePercentage(customEvent, progressBarRef);
    uiPercentageRef.current = newPercentage;
    setDraggingProgress(newPercentage);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    setIsDragging(true);
    const newPercentage = calculatePercentage(
      {
        clientX: event.clientX,
        target: event.target as Element,
      },
      progressBarRef
    );
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
