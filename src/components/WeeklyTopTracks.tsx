"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  SectionContainer,
  SectionGrid,
  SectionNav,
  SectionTitle,
} from "@/styles/WeeklyTopTracks";
import { Button } from "@nextui-org/button";
import { Icons } from "./Icons";
import TrackCard from "./TrackCard/TrackCard";
import { useFetchTracks } from "../hooks/useFetchTracks";
import GhostRoundBtn from "./icons/ghostRoundBtn";

interface WeeklyTopTracksProps {}

function WeeklyTopTracks() {
  const tracks = useFetchTracks();
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
        {tracks.map((track, index) => (
          <TrackCard track={track} key={index} />
        ))}
      </SectionGrid>
    </SectionContainer>
  );
}

export default WeeklyTopTracks;
