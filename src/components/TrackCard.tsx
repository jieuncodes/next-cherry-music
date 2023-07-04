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
import { DropdownComponent } from "./TrackCardDropDown";


interface ChartCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

export const ChartCard: React.FC<ChartCardProps> = ({ track }) => {
  const [liked, setLiked] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  const iconColor = isCardHover || isDropdownHover ? "white" : "currentColor";

  if (!track) return null;

  
  return (
    <StyledCard
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      className={`${
        isCardHover || isDropdownHover ? "bg-black/30" : "bg-white"
      } `}
    >
      <StyledHeader>
        <div className="relative flex gap-5 w-full ">
          {isCardHover && (
            <>
              <Icons.play
                color="white"
                fill="white"
                size={17}
                className="absolute ml-3 mt-[0.7rem] opacity-100 z-10"
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
                <DropdownComponent
                  onMouseEnter={() => setIsDropdownHover(true)}
                  onMouseLeave={() => setIsDropdownHover(false)}
                  iconColor={iconColor}
                />
              </Buttons>
            </>
          )}
          <Image
            alt="album image"
            className={`object-cover rounded-md ${
              isCardHover ? "opacity-80" : ""
            }`}
            src={track.albumImgUrl || ""}
            height={40}
            width={40}
          />

          <CardDetails>
            {track.trackTitle && track.trackTitle.length > 20 && isCardHover ? (
              <Marquee trackTitleText={track.trackTitle} />
            ) : (
              <TrackTitle className={isCardHover ? "text-white" : ""}>
                {track.trackTitle}
              </TrackTitle>
            )}

            <Artist className={isCardHover ? "text-white/70" : ""}>
              {track.artist}
            </Artist>
          </CardDetails>
        </div>
      </StyledHeader>
    </StyledCard>
  );
};
