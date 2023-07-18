import { useState } from "react";
import { StyledCard, StyledHeader } from "@/styles/TrackCard";
import { Database } from "@/lib/server/database.types";
import TrackCardImage from "./TrackCardImage";
import TrackCardDetails from "./TrackCardDetails";
import TrackCardButtons from "./TrackCardBtns";

interface TrackCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
  onClick: (event: MouseEvent) => void;
}

export function TrackCard({ track, onClick }: TrackCardProps) {
  const [liked, setLiked] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  const iconColor = isCardHover || isDropdownHover ? "white" : "currentColor";

  if (!track) return null;

  return (
    <StyledCard
      isPressable={true}
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      className={`${
        isCardHover || isDropdownHover ? "bg-black/30" : "bg-white"
      } `}
    >
      <StyledHeader>
        <TrackCardImage isCardHover={isCardHover} track={track} />
        <TrackCardDetails isCardHover={isCardHover} track={track} />
        <TrackCardButtons
          isCardHover={isCardHover}
          setIsDropdownHover={setIsDropdownHover}
          iconColor={iconColor}
          liked={liked}
          setLiked={setLiked}
        />
      </StyledHeader>
    </StyledCard>
  );
}

export default TrackCard;
