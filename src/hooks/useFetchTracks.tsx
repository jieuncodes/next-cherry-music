"use client";

import { useEffect, useState } from "react";
import { Database } from "@/lib/server/database.types";
import { fetchTracks } from "@/app/api/fetchTracks";

export const useFetchTracks = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);

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
