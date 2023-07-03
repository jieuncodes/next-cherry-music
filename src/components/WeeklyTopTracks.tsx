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
import { ChartCard } from "./TrackCard";
import { Button } from "@nextui-org/button";
import { Icons } from "./Icons";

interface WeeklyTopTracksProps {}

const WeeklyTopTracks: FC<WeeklyTopTracksProps> = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);

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
        />
        <Button
          isIconOnly
          variant="ghost"
          startContent={<Icons.chevronRight />}
          size="xs"
          radius="full"
        />
      </SectionNav>
      <SectionTitle>Weekly Top Tracks</SectionTitle>
        <SectionGrid>
          {tracks.map((track, index) => (
            <ChartCard track={track} key={index} />
          ))}
        </SectionGrid>
    </SectionContainer>
  );
};

export default WeeklyTopTracks;
