import LikeButton from "@/components/Btns/LikeButton";
import CardDropDown from "@/components/TrackCard/TrackCardDropDown";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { Track } from "@/lib/server/database.types";
import { StyledCard, StyledHeader } from "@/styles/Artist/ArtistTrackCard";
import { useRef, useState } from "react";
import { artistPageDropdownItems } from "../Dropdowns/DropdownItems";
import ArtistPlaylistCardDetails from "./ArtistPlaylistCardDetails";

interface PlaylistCardProps {
  track: Track;
  index: number;
  isPlayingTrack?: boolean;
}

function ArtistPlaylistCard({
  track,
  index,
  isPlayingTrack,
}: PlaylistCardProps) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);

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
        <ArtistPlaylistCardDetails
          isCardHover={isCardHover}
          track={track}
          onPlaylist={true}
          isPlayingTrack={isPlayingTrack}
        />
        <div className="absolute right-0">
          {isCardHover && (
            <LikeButton liked={liked} setLiked={setLiked} iconColor="white" />
          )}
          <CardDropDown
            track={track}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={artistPageDropdownItems}
            cardRef={trackCardRef}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default ArtistPlaylistCard;
