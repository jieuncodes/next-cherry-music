import CardDropDown from "@/components/TrackCard/TrackCardDropDown";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { StyledCard, StyledHeader } from "@/styles/Artist/ArtistTrackCard";
import { useRef, useState } from "react";
import {
  artistPageDropdownItems,
  trackActionDropdownItems,
} from "../Dropdowns/DropdownItems";
import { Track } from "@/lib/server/database.types";
import LikeTrackBtn from "../Btns/LikeTrackBtn";
import { useUser } from "@supabase/auth-helpers-react";
import LongPlaylistCardDetails from "./LongPlaylistCardDetails";

interface PlaylistCardProps {
  track: Track;
  index: number;
  isPlayingTrack?: boolean;
  pageType?: "artistPage" | "dashboard";
}

function LongPlaylistCard({
  track,
  index,
  isPlayingTrack,
  pageType,
}: PlaylistCardProps) {
  const user = useUser();
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
        <LongPlaylistCardDetails
          isCardHover={isCardHover}
          track={track}
          onPlaylist={true}
          isPlayingTrack={isPlayingTrack}
        />
        <div className="absolute right-0">
          {isCardHover && <LikeTrackBtn track={track} user={user} isBlack />}
          <CardDropDown
            track={track}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={
              pageType === "artistPage"
                ? artistPageDropdownItems
                : trackActionDropdownItems
            }
            cardRef={trackCardRef}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default LongPlaylistCard;
