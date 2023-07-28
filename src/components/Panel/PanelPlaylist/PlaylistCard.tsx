import { StyledCard, StyledHeader } from "@/styles/Panel/PlaylistCard";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import TrackCardDetails from "@/components/TrackCard/TrackCardDetails";
import { useState } from "react";
import { Track } from "@/lib/server/database.types";
import CardDropDown from "@/components/TrackCard/TrackCardDropDown";
import { Icons } from "@/app/Icons";
import { DropdownItemData } from "@/types/itemTypes";

interface PlaylistCardProps {
  track: Track;
  index: number;
}
function PlaylistCard({ track, index }: PlaylistCardProps) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  return (
    <StyledCard
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      radius="sm"
      className={`${
        isCardHover || isDropdownHover ? "bg-black/30" : "bg-white/30"
      } `}
    >
      <StyledHeader>
        <TrackCardImage isCardHover={isCardHover} track={track} size="small" />
        <TrackCardDetails
          isCardHover={isCardHover}
          track={track}
          size="small"
          onPlaylist={true}
        />
        <div className="absolute right-0">
          <CardDropDown
            track={track}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            iconColor="black"
            dropdownItems={dropdownItems}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default PlaylistCard;

export const dropdownItems: DropdownItemData[] = [
  {
    key: "remove-item",
    icon: <Icons.minus strokeWidth={1.5} />,
    label: "remove from playlist",
  },
];
