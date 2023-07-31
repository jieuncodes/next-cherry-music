"use client";

import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import useTopTracks from "@/hooks/useTopTracks";
import {
  SectionContainer,
  SectionGrid,
  SectionNav,
  SectionTitle,
} from "@/styles/TopTracks";
import { useEffect, useRef, useState } from "react";
import { Icons } from "../app/Icons";
import GhostRoundBtn from "./Btns/ghostRoundBtn";
import TrackCard from "./TrackCard/TrackCard";
import TrackCardSkeleton from "./TrackCard/TrackCardSkeleton";

function TopTracks() {
  const { isSaved, isLoading, topTracks } = useTopTracks();

  const {
    playlist,
    addToTopOfCurrPlaylist,
    addToBottomOfCurrPlaylist,
    removeFromPlaylist,
  } = useLocalStoragePlaylist();
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
      <SectionTitle>Top Tracks</SectionTitle>
      <SectionGrid ref={ref}>
        {!isSaved && isLoading
          ? Array(30)
              .fill(null)
              .map((_, index) => <TrackCardSkeleton key={index} />)
          : topTracks.map((track, index) => (
              <TrackCard
                key={index}
                track={track}
                addToTopOfCurrPlaylist={addToTopOfCurrPlaylist}
                removeFromPlaylist={removeFromPlaylist}
              />
            ))}
      </SectionGrid>
    </SectionContainer>
  );
}

export default TopTracks;
