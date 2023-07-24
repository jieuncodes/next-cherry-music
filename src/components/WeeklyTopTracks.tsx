"use client";

import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import {
  SectionContainer,
  SectionGrid,
  SectionNav,
  SectionTitle,
} from "@/styles/WeeklyTopTracks";
import { useEffect, useRef, useState } from "react";
import { useFetchTracks } from "../hooks/useFetchTracks";
import GhostRoundBtn from "./Btns/ghostRoundBtn";
import { Icons } from "./Icons";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";
import { Track } from "@/lib/server/database.types";
import { useSupabaseTracks } from "@/hooks/useSupabaseTracks";

function WeeklyTopTracks() {
  const { tracks, isLoading }: { tracks: Track[]; isLoading: boolean } =
    useFetchTracks();
  const { isSaved } = useSupabaseTracks();

  const { playlist, addToPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();
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
                handleClick={() => addToPlaylist(track)}
              />
            ))}
      </SectionGrid>
    </SectionContainer>
  );
}

export default WeeklyTopTracks;
