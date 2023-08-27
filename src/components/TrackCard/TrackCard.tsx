import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { StyledCard, StyledHeader } from "@/styles/TrackCard";
import { useState } from "react";
import TrackCardButtons from "./TrackCardBtns";
import TrackCardDetails from "./TrackCardDetails";
import TrackCardImage from "./TrackCardImage";
import { CherryTrack } from "@/types/itemTypes";

interface TrackCardProps {
  track: CherryTrack;
  addToTopOfCurrPlaylist: (track: CherryTrack) => void;
  removeFromPlaylist: (trackId: number) => void;
}

export function TrackCard({ track }: TrackCardProps) {
  const { addToTopOfCurrPlaylist } = useLocalStoragePlaylist();
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
      <StyledHeader onClick={() => addToTopOfCurrPlaylist(track)}>
        <TrackCardImage isCardHover={isCardHover} track={track} />
        <TrackCardDetails isCardHover={isCardHover} track={track} />
      </StyledHeader>
      <TrackCardButtons
        track={track}
        isCardHover={isCardHover}
        setIsCardHover={setIsCardHover}
        setIsDropdownHover={setIsDropdownHover}
        iconColor={iconColor}
        liked={liked}
        setLiked={setLiked}
      />
    </StyledCard>
  );
}

export default TrackCard;
