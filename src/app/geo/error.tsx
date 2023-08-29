"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    router.refresh();
  }, []);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Please refresh the page.</p>
    </div>
  );
}
