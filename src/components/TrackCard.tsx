import { ReactNode, useEffect, useState } from "react";
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
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";

interface ChartCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

type DropdownItemSelectedIconProps = {
  icon?: ReactNode;
  isSelected?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
  selectedIcon?:
    | ReactNode
    | ((props: DropdownItemSelectedIconProps) => ReactNode)
    | null;
};

export const ChartCard: React.FC<ChartCardProps> = ({ track }) => {
  const [liked, setLiked] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  const iconColor = isCardHover || isDropdownHover ? "white" : "currentColor";

  if (!track) return null;

  const dropdownItems = [
    {
      key: "play-next",
      icon: Icons.listVideo,
      label: "Play next",
    },
    {
      key: "add-to-queue",
      icon: Icons.listMusic,
      label: "Add to queue",
    },
    {
      key: "add-to-playlist",
      icon: Icons.listPlus,
      label: "Add to playlist",
    },
    {
      key: "go-to-album",
      icon: Icons.disc,
      label: "Go to album",
    },
    {
      key: "go-to-artist",
      icon: Icons.mic2,
      label: "Go to artist",
    },
  ];
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
                <Dropdown
                  onMouseEnter={() => setIsDropdownHover(true)}
                  onMouseLeave={() => setIsDropdownHover(false)}
                >
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" variant="light">
                      <Icons.moreVertical color={iconColor} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Dropdown menu with icons"
                    items={dropdownItems}
                    onAction={() => setIsDropdownHover(false)}
                  >
                    {(item: any) => {
                      const typedItem = item as {
                        key: string;
                        label: string;
                        icon: React.ComponentType<any>;
                      };
                      const IconComponent = typedItem.icon;

                      return (
                        <DropdownItem
                          key={typedItem.key}
                          startContent={<IconComponent strokeWidth={1.5} />}
                        >
                          {typedItem.label}
                        </DropdownItem>
                      );
                    }}
                  </DropdownMenu>
                </Dropdown>
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
