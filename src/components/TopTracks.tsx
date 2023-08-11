"use client";

import useDbTracks from "@/hooks/useDbTracks";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import {
  SectionContainerMain,
  SectionGridMain,
  SectionTitleMain,
} from "@/styles/Section";
import { useEffect, useRef, useState } from "react";
import SectionNavigator from "./SectionNavigator";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";

function TopTracks() {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "topTracks",
    query: "top",
  });
  const { playlist, addToTopOfCurrPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();
  const [scrollX, setScrollX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollX(ref.current?.scrollLeft || 0);
  }, [scrollX]);

  return (
    <SectionContainerMain>
      <SectionNavigator refContainer={ref} scrollAmount={300} />
      <SectionTitleMain>Top Tracks</SectionTitleMain>
      <SectionGridMain ref={ref}>
        {!isSaved && isLoading
          ? Array(30)
              .fill(null)
              .map((_, index) => <TrackCardSkeleton key={index} />)
          : reqTracks.map((track, index) => (
              <TrackCard
                key={index}
                track={track}
                addToTopOfCurrPlaylist={addToTopOfCurrPlaylist}
                removeFromPlaylist={removeFromPlaylist}
              />
            ))}
      </SectionGridMain>
    </SectionContainerMain>
  );
}

export default TopTracks;
