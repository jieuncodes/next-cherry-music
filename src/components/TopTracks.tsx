"use client";

import { Track } from "@/lib/server/database.types";
import {
  SectionContainerMain,
  SectionGrid,
  SectionTitle,
} from "@/styles/Section";
import { useEffect, useRef, useState } from "react";
import SectionNavigator from "./SectionNavigator";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";

interface TopTracksProps {
  count?: number;
  trackList?: Track[];
}

function TopTracks({ count, trackList = [] }: TopTracksProps) {
  const [scrollX, setScrollX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollX(ref.current?.scrollLeft || 0);
  }, [scrollX]);

  const renderedCards = [];

  for (let i = 0; i < trackList.length; i++) {
    renderedCards.push(<TrackCard key={i} track={trackList[i]} />);
  }
  if (count) {
    for (let i = trackList.length; i < count; i++) {
      renderedCards.push(<TrackCardSkeleton key={`skeleton-${i}`} />);
    }
  }

  return (
    <SectionContainerMain>
      <SectionNavigator refContainer={ref} scrollAmount={300} />
      <SectionGrid ref={ref}>{renderedCards}</SectionGrid>
    </SectionContainerMain>
  );
}

export default TopTracks;
