"use client";

import { supabase } from "@/lib/server/client";
import { Database } from "@/lib/server/database.types";
import { FC, useEffect, useState } from "react";
import { Card, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { HeartIcon } from "lucide-react";
import {
  Artist,
  CardDetails,
  SectionContainer,
  SectionGrid,
  SectionTitle,
  StyledCard,
  StyledHeader,
  TrackTitle,
} from "@/styles/WeeklyTopTracks";

interface WeeklyTopTracksProps {}

const WeeklyTopTracks: FC<WeeklyTopTracksProps> = () => {
  const [tracks, setTracks] = useState<
    Database["public"]["Tables"]["tracks"]["Row"][]
  >([]);
  const [liked, setLiked] = useState(false);

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
        console.log("tracks has album", tracks);
      }
    };
    fetchTracks();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle>Weekly Top Tracks</SectionTitle>
      <SectionGrid>
        {tracks.map((track) => (
          <StyledCard>
            <StyledHeader>
              <div className="flex gap-5">
                <Image
                  alt="album image"
                  className="object-cover rounded-md"
                  src={track.albumImgUrl || ""}
                  height={40}
                  width={40}
                />
                <CardDetails>
                  <TrackTitle>{track.trackTitle}</TrackTitle>
                  <Artist>{track.artist}</Artist>
                </CardDetails>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </StyledHeader>
          </StyledCard>
        ))}
      </SectionGrid>
    </SectionContainer>
  );
};

export default WeeklyTopTracks;
