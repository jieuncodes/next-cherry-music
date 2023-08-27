import { useState, useEffect } from "react";
import * as d3 from "d3";
import { ArtistDetail } from "@/types/lastFmTypes";

export const useMaxListeners = (refinedSimilarArtists: ArtistDetail[]) => {
  const [maxListenersVal, setMaxListenersVal] = useState<number>(0);

  useEffect(() => {
    const maxListenersValue = d3.max(refinedSimilarArtists, (item) =>
      Number(item.listeners)
    );
    if (maxListenersValue) setMaxListenersVal(maxListenersValue);
  }, [refinedSimilarArtists]);

  return maxListenersVal;
};
export default useMaxListeners;
