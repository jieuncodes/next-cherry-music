import { RefObject } from "react";
import { YouTubePlayer } from "react-youtube";

export function validateEnvVariable(
  variable: string | undefined,
  name: string
): void {
  if (!variable) {
    throw new Error(`Missing environment variable: ${name}`);
  }
}

export const handleError = ({
  context,
  error,
}: {
  context: string;
  error: any;
}) => {
  console.error(
    `Error on ${context}:`,
    error instanceof Error ? error.message : error
  );
  throw error instanceof Error ? error : new Error("An unknown error occurred");
};

export const isDataOld = (lastFetchTime: Date | null): boolean => {
  const REFRESH_TERM_MILLISECOND = 6 * 60 * 60 * 1000;

  return (
    !lastFetchTime ||
    new Date().getTime() - lastFetchTime.getTime() >= REFRESH_TERM_MILLISECOND
  );
};

export const isValidPlayer = (playerRef: RefObject<YouTubePlayer>): boolean => {
  return (
    playerRef.current &&
    typeof playerRef.current.getCurrentTime === "function" &&
    typeof playerRef.current.getDuration() === "function"
  );
};

export const ensureEncoded = (str: string): string => {
  if (str !== decodeURIComponent(str)) {
    return str;
  }
  return encodeURIComponent(str);
};
export const encodeWithPlus = (str: string): string => {
  return encodeURIComponent(str).replace(/%20/g, "+").replace(/'/g, "%27");
};

export function sanitizeName(text: string) {
  return text.replace(/[^a-zA-Z0-9]/g, "-");
}
