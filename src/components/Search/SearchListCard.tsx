import TrackCardDetails from "@/components/TrackCard/TrackCardDetails";
import CardDropDown from "@/components/TrackCard/TrackCardDropDown";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { Track } from "@/lib/server/database.types";
import { StyledCard, StyledHeader } from "@/styles/Panel/PlaylistCard";
import { useRef, useState } from "react";
import { trackActionDropdownItems } from "../Dropdowns/DropdownItems";

interface SearchListCardProps {
  track: Track;
  index: number;
  isPlayingTrack?: boolean;
}

function SearchListCard({ track, index, isPlayingTrack }: SearchListCardProps) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const { addToTopOfCurrPlaylist } = useLocalStoragePlaylist();

  const trackCardRef = useRef<HTMLButtonElement | null>(null);

  return (
    <StyledCard
      data-playlist-index={index}
      ref={trackCardRef}
      isPressable
      onPress={() => addToTopOfCurrPlaylist(track)}
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      radius="sm"
      className={`${
        isCardHover || isDropdownHover ? "bg-black/20" : "bg-white/30"
      } ${isPlayingTrack && "bg-black/30 "}`}
    >
      <StyledHeader>
        <TrackCardImage isCardHover={isCardHover} track={track} size="small" />
        <TrackCardDetails
          isCardHover={isCardHover}
          track={track}
          size="small"
          onPlaylist={true}
          isPlayingTrack={isPlayingTrack}
        />
        <div className="absolute right-0">
          <CardDropDown
            track={track}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={trackActionDropdownItems}
            cardRef={trackCardRef}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default SearchListCard;
