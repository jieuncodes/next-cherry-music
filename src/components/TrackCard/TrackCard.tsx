import { useState } from "react";
import { StyledCard, StyledHeader } from "@/styles/TrackCard";
import { Database, Track } from "@/lib/server/database.types";
import TrackCardImage from "./TrackCardImage";
import TrackCardDetails from "./TrackCardDetails";
import TrackCardButtons from "./TrackCardBtns";

interface TrackCardProps {
  track: Track;
  handleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export function TrackCard({ track, handleClick }: TrackCardProps) {
  const [liked, setLiked] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  const iconColor = isCardHover || isDropdownHover ? "white" : "currentColor";

  if (!track) return null;

  return (
    <StyledCard
      disableAnimation
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      className={`${
        isCardHover || isDropdownHover ? "bg-black/30" : "bg-white"
      } `}
    >
      <StyledHeader onClick={handleClick}>
        <TrackCardImage isCardHover={isCardHover} track={track} />
        <TrackCardDetails isCardHover={isCardHover} track={track} />
      </StyledHeader>
      <TrackCardButtons
        isCardHover={isCardHover}
        setIsDropdownHover={setIsDropdownHover}
        iconColor={iconColor}
        liked={liked}
        setLiked={setLiked}
      />
    </StyledCard>
  );
}

export default TrackCard;
