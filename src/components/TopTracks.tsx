"use client";

import useDbTracks, { UseDbTracksProps } from "@/hooks/useDbTracks";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import {
  SectionContainerMain,
  SectionGridMain,
  SectionTitle,
} from "@/styles/Section";
import { useEffect, useRef, useState } from "react";
import SectionNavigator from "./SectionNavigator";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";

interface TopTracksProps {
  title: string;
  trackCategory: UseDbTracksProps["trackCategory"];
  query: UseDbTracksProps["query"];
  tag?: string;
  count?: number;
}

function TopTracks({
  title,
  trackCategory,
  query,
  tag,
  count,
}: TopTracksProps) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory,
    query,
    tag,
    count,
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
      <SectionTitle>{title}</SectionTitle>
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
