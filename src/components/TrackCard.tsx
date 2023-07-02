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

interface ChartCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

export const ChartCard: React.FC<ChartCardProps> = ({ track }) => {
  const [liked, setLiked] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  if (!track) return null;

  const iconColor = showButtons ? "white" : "currentColor";

  return (
    <StyledCard
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="hover:bg-black/30"
    >
      <StyledHeader>
        <div className="relative flex gap-5 w-full ">
          {showButtons && (
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
            className={`object-cover rounded-md ${
              showButtons ? "opacity-80" : ""
            }`}
            src={track.albumImgUrl || ""}
            height={40}
            width={40}
          />

          <CardDetails>
            <TrackTitle className={showButtons ? "text-white" : ""}>
              {track.trackTitle}
            </TrackTitle>
            <Artist className={showButtons ? "text-white/70" : ""}>
              {track.artist}
            </Artist>
          </CardDetails>
        </div>
      </StyledHeader>
    </StyledCard>
  );
};
