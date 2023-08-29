import { Track } from "@/lib/server/database.types";
import { SliderItemProps } from "@/types/itemTypes";
import { useEffect, useState } from "react";

function useCountryTopArtists(countryTopTracks: Track[], country: string) {
  const [countryTopArtists, setCountryTopArtists] = useState<SliderItemProps[]>(
    []
  );

  useEffect(() => {
    if (countryTopTracks) {
      const artistNames = new Set();
      const artists: SliderItemProps[] = [];
      countryTopTracks.forEach((track: Track) => {
        if (track.artist && !artistNames.has(track.artist)) {
          artistNames.add(track.artist);
          artists.push({ name: track.artist });
        }
      });
      setCountryTopArtists(artists);
    }
  }, [countryTopTracks, country]);

  return countryTopArtists;
}
export default useCountryTopArtists;
