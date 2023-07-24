"use client";

import { useEffect, useState } from "react";
import { Track } from "@/lib/server/database.types";

export const useFetchTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/supabase/get-from-db");
        const fetchedTracks: Track[] = await response.json();
        setTracks(fetchedTracks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tracks, isLoading };
};
