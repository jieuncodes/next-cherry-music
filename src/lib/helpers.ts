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

  return lastFetchTime &&
    new Date().getTime() - lastFetchTime.getTime() < REFRESH_TERM_MILLISECOND
    ? true
    : false;
};

export const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};
