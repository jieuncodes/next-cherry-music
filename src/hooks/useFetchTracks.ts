"use client";

import { useEffect, useState } from "react";
import { Database, Track } from "@/lib/server/database.types";
import { fetchTracks } from "@/app/api/fetchTracks";

export const useFetchTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTracks = await fetchTracks();
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
