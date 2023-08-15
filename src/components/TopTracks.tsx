"use client";

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
import { Track } from "@/lib/server/database.types";

interface TopTracksProps {
  title: string;
  tag?: string;
  count?: number;
  trackList: Track[];
}

function TopTracks({ title, tag, count, trackList }: TopTracksProps) {
  const { playlist, addToTopOfCurrPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();
  const [scrollX, setScrollX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  console.log("trackList", trackList);
  useEffect(() => {
    setScrollX(ref.current?.scrollLeft || 0);
  }, [scrollX]);

  return (
    <SectionContainerMain>
      <SectionNavigator refContainer={ref} scrollAmount={300} />
      <SectionTitle>{title}</SectionTitle>
      <SectionGridMain ref={ref}>
        {trackList?.map((track, index) => (
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
