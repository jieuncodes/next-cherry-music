"use client";

import { useEffect, useRef, useState } from "react";
import {
  SectionContainer,
  SectionGrid,
  SectionNav,
  SectionTitle,
} from "@/styles/WeeklyTopTracks";
import { Icons } from "./Icons";
import TrackCard from "./TrackCard/TrackCard";
import { useFetchTracks } from "../hooks/useFetchTracks";
import GhostRoundBtn from "./icons/ghostRoundBtn";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";

function WeeklyTopTracks() {
  const { tracks, isLoading } = useFetchTracks();
  const [scrollX, setScrollX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const scrollAmount = 300;
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setScrollX(ref.current?.scrollLeft || 0);
  }, [scrollX]);

  return (
    <SectionContainer>
      <SectionNav>
        <GhostRoundBtn
          startContent={<Icons.chevronLeft />}
          onPress={scrollLeft}
        />
        <GhostRoundBtn
          startContent={<Icons.chevronRight />}
          onPress={scrollRight}
        />
      </SectionNav>
      <SectionTitle>Weekly Top Tracks</SectionTitle>
      <SectionGrid ref={ref}>
        {isLoading
          ? Array(30)
              .fill(null)
              .map((_, index) => <TrackCardSkeleton key={index} />)
          : tracks.map((track, index) => (
              <TrackCard track={track} key={index} />
            ))}
      </SectionGrid>
    </SectionContainer>
  );
}

export default WeeklyTopTracks;
