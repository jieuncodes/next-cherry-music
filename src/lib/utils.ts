import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
