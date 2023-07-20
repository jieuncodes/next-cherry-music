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
import GhostRoundBtn from "./Btns/ghostRoundBtn";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";
import { Database } from "@/lib/server/database.types";

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

  const addToQueue = (track: Database["public"]["Tables"]["tracks"]["Row"]) => {
    console.log("track", track);
  };

  return (
    <SectionContainer>
      <SectionNav>
        <GhostRoundBtn
          size={"sm"}
          startContent={<Icons.chevronLeft size={20} />}
          onPress={scrollLeft}
        />
        <GhostRoundBtn
          size={"sm"}
          startContent={<Icons.chevronRight size={20} />}
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
              <TrackCard
                key={index}
                track={track}
                handleClick={() => addToQueue(track)}
              />
            ))}
      </SectionGrid>
    </SectionContainer>
  );
}

export default WeeklyTopTracks;
