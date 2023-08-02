import { ClassValue, clsx } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";
import { YouTubePlayer } from "react-youtube";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function floatToTime(floatNumber: number) {
  const minutes = Math.floor(floatNumber);
  const seconds = Math.floor((floatNumber - minutes) * 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const calculatePercentage = (
  event: MouseEvent,
  progressBarRef: RefObject<HTMLDivElement>
): number => {
  const rect = progressBarRef.current?.getBoundingClientRect();
  if (rect && rect.width) {
    const x = event.clientX - rect.left;
    return (x / rect.width) * 100;
  }
  return 0;
};

export const isValidPlayer = (playerRef: RefObject<YouTubePlayer>): boolean => {
  return (
    playerRef.current &&
    typeof playerRef.current.getCurrentTime === "function" &&
    typeof playerRef.current.getDuration() === "function"
  );
};
