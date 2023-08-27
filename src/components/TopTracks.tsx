"use client";

import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import {
  SectionContainerMain,
  SectionGridMain,
  SectionTitle,
} from "@/styles/Section";
import { Suspense, useEffect, useRef, useState } from "react";
import SectionNavigator from "./SectionNavigator";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";
import { CherryTrack } from "@/types/itemTypes";

interface TopTracksProps {
  title: string;
  tag?: string;
  count?: number;
  trackList: CherryTrack[];
}

function TopTracks({ title, tag, count, trackList }: TopTracksProps) {
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
        {trackList?.map((track, index) => (
          <Suspense key={index} fallback={<TrackCardSkeleton />}>
            <TrackCard
              key={index}
              track={track}
              addToTopOfCurrPlaylist={addToTopOfCurrPlaylist}
              removeFromPlaylist={removeFromPlaylist}
            />
          </Suspense>
        ))}
      </SectionGridMain>
    </SectionContainerMain>
  );
}

export default TopTracks;
