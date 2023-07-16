"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/server/client";
import { Database } from "@/lib/server/database.types";

export const useFetchTracks = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);

  useEffect(() => {
    const fetchTracks = async () => {
      let { data: tracks, error } = await supabase
        .from("tracks")
        .select("artist, trackTitle, albumImgUrl")
        .not("albumImgUrl", "eq", null)
        .range(0, 27);

      if (error) {
        console.error(error);
      } else {
        setTracks(tracks as Database["public"]["Tables"]["tracks"]["Row"][]);
      }
    };

    fetchTracks();
  }, []);

  return tracks;
};
