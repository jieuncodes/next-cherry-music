import { useState, useEffect } from "react";

export const useArtistImage = (artist: string): string => {
  const [artistImageUrl, setAritstImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchSpotifyImage = async (): Promise<void> => {
      const response = await fetch(`/api/spotify/artist?artist=${artist}`);
      if (!response.ok) throw new Error("Failed to fetch spotify artist image");
      const data = await response.json();
      setAritstImageUrl(data.best_match.items[0].images[0]?.url);
    };

    fetchSpotifyImage();
  }, [artist]);

  return artistImageUrl;
};
