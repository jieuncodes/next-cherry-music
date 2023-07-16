"use client";

import { supabase } from "@/lib/server/client";
import { Database } from "@/lib/server/database.types";
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

interface WeeklyTopTracksProps {}

const WeeklyTopTracks: FC<WeeklyTopTracksProps> = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);
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

  useEffect(() => {
    const fetchTracks = async () => {
      let { data: tracks, error } = await supabase
        .from("tracks")
        .select("artist, trackTitle, albumImgUrl")
        .not("albumImgUrl", "eq", null)
        .range(0, 27);
      if (error) {
        console.error(error);
      } else {
        setTracks(tracks as Database["public"]["Tables"]["tracks"]["Row"][]);
      }
    };
    fetchTracks();
  }, []);

  return (
    <SectionContainer>
      <SectionNav>
        <Button
          isIconOnly
          variant="ghost"
          startContent={<Icons.chevronLeft />}
          size="xs"
          radius="full"
          onPress={scrollLeft}
        />
        <Button
          isIconOnly
          variant="ghost"
          startContent={<Icons.chevronRight />}
          size="xs"
          radius="full"
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
};

export default WeeklyTopTracks;
