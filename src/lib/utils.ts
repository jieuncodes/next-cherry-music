import { ClassValue, clsx } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

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

export const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

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
export const cleanedStr = (str: string) => {
  const cleanedStr = str.replace(
    /<a href="https:\/\/www\.last\.fm\/.*">Read more on Last.fm<\/a>/,
    ""
  );
  return cleanedStr;
};
export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
export const generateTrackId = (url: string): number => {
  const urlLastPart = url.split("/");
  return simpleHash(urlLastPart[urlLastPart.length - 1]);
};
