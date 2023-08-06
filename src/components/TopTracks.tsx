"use client";

import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import useTopTracks from "@/hooks/useTopTracks";
import {
  SectionContainerMain,
  SectionGridMain,
  SectionNav,
  SectionTitleMain,
} from "@/styles/Section";
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
    <SectionContainerMain>
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
      <SectionTitleMain>Top Tracks</SectionTitleMain>
      <SectionGridMain ref={ref}>
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
      </SectionGridMain>
    </SectionContainerMain>
  );
}

export default TopTracks;
