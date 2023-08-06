import { useState, useEffect } from "react";
import { LastFmArtistInfo } from "@/types/trackTypes";

export const useArtistData = (artist: string): LastFmArtistInfo | undefined => {
  const [artistData, setArtistData] = useState<LastFmArtistInfo>();

  useEffect(() => {
    const fetchArtistData = async (): Promise<void> => {
      const response = await fetch(`/api/lastFm/artist?artist=${artist}`);
      if (!response.ok) {
        console.log("error");
        return;
      }
      const data: LastFmArtistInfo = await response.json();
      setArtistData(data);
    };

    fetchArtistData();
  }, [artist]);

  return artistData;
};
