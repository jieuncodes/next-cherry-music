import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Artist, CardDetails, StyledCard, StyledHeader, TrackTitle } from "@/styles/WeeklyTopTracks";
import Image from "next/image";
import { Database } from "@/lib/server/database.types";
import { Icons } from './Icons';

interface ChartCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

export const ChartCard: React.FC<ChartCardProps> = ({ track }) => {
  const [liked, setLiked] = useState(false);

  if (!track) return null;

  return (
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
          <Icons.heart
            className={liked ? "[&>path]:stroke-transparent" : ""}
            fill={liked ? "currentColor" : "none"}
          />
        </Button>
      </StyledHeader>
    </StyledCard>
  );
};
