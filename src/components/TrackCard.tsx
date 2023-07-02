import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Artist,
  CardDetails,
  StyledCard,
  StyledHeader,
  TrackTitle,
} from "@/styles/TrackCard";
import Image from "next/image";
import { Database } from "@/lib/server/database.types";
import { Icons } from "./Icons";
import { Buttons } from "@/styles/TrackCard";
import Marquee from "@/animations/marquee";

interface ChartCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

export const ChartCard: React.FC<ChartCardProps> = ({ track }) => {
  const [liked, setLiked] = useState(false);
  const [ishover, setIshover] = useState(false);

  if (!track) return null;

  const iconColor = ishover ? "white" : "currentColor";

  return (
    <StyledCard
      onMouseEnter={() => setIshover(true)}
      onMouseLeave={() => setIshover(false)}
      className="hover:bg-black/30"
    >
      <StyledHeader>
        <div className="relative flex gap-5 w-full ">
          {ishover && (
            <>
              <Icons.play
                color="white"
                fill="white"
                size={17}
                className="absolute ml-3 mt-[0.7rem] opacity-100"
              />
              <Buttons>
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <Icons.heart
                    color={iconColor}
                    fill={liked ? iconColor : "none"}
                  />
                </Button>
                <Button isIconOnly radius="full" variant="light">
                  <Icons.moreVertical color={iconColor} />
                </Button>
              </Buttons>
            </>
          )}
          <Image
            alt="album image"
            className={`object-cover rounded-md ${ishover ? "opacity-80" : ""}`}
            src={track.albumImgUrl || ""}
            height={40}
            width={40}
          />

          <CardDetails>
            {track.trackTitle && track.trackTitle.length > 20 && ishover? (
              <Marquee trackTitleText={track.trackTitle} />
            ) : (
              <TrackTitle>{track.trackTitle}</TrackTitle>
            )}

            <Artist className={ishover ? "text-white/70" : ""}>
              {track.artist}
            </Artist>
          </CardDetails>
        </div>
      </StyledHeader>
    </StyledCard>
  );
};
