import TrackCardDetails from "@/components/TrackCard/TrackCardDetails";
import CardDropDown from "@/components/TrackCard/TrackCardDropDown";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import usePlayerControls from "@/hooks/usePlayerControls";
import { StyledCard, StyledHeader } from "@/styles/Panel/PlaylistCard";
import { useRef, useState } from "react";
import { playlistActionDropdownItems } from "../Dropdowns/DropdownItems";
import { Track } from "@/lib/server/database.types";

interface PlaylistCardProps {
  track: Track;
  index: number;
  isPlayingTrack?: boolean;
}

function PlaylistCard({ track, index, isPlayingTrack }: PlaylistCardProps) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const { handlePlayClickedInPlaylist } = usePlayerControls();

  const trackCardRef = useRef<HTMLButtonElement | null>(null);

  return (
    <StyledCard
      data-playlist-index={index}
      ref={trackCardRef}
      isPressable
      onPress={() => handlePlayClickedInPlaylist(index)}
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
            dropdownItems={playlistActionDropdownItems}
            cardRef={trackCardRef}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default PlaylistCard;
