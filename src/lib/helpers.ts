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

  //for debugging
  return true;
  //   return lastFetchTime &&
  //     new Date().getTime() - lastFetchTime.getTime() < REFRESH_TERM_MILLISECOND
  //     ? true
  //     : false;
};
