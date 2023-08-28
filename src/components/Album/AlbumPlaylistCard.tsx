"use client";

import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { AlbumIndex, StyledCard, StyledHeader } from "@/styles/Album/album";
import { useRef, useState } from "react";
import LikeButton from "../Btns/LikeButton";
import { AlbumPageDropdownItems } from "../Dropdowns/DropdownItems";
import TrackCardDropDown from "../TrackCard/TrackCardDropDown";
import AlbumTrackCardDetails from "./AlbumTrackCardDetails";
import { Track } from "@/lib/server/database.types";

interface PlaylistCardProps {
  track: Track;
  index: number;
  isPlayingTrack?: boolean;
}

function AlbumPlaylistCard({
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
        isCardHover || isDropdownHover ? "bg-black/20" : "bg-white/40"
      } ${isPlayingTrack && "bg-black/30 "}`}
    >
      <StyledHeader>
        <AlbumIndex
          className={`${isCardHover || isPlayingTrack ? "text-white" : ""} `}
        >
          {index + 1}
        </AlbumIndex>
        <AlbumTrackCardDetails
          isCardHover={isCardHover}
          track={track}
          isPlayingTrack={isPlayingTrack}
        />
        <div className="absolute right-3">
          {isCardHover && (
            <LikeButton liked={liked} setLiked={setLiked} iconColor="white" />
          )}
          <TrackCardDropDown
            track={track}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={AlbumPageDropdownItems}
            cardRef={trackCardRef}
          />
        </div>
      </StyledHeader>
    </StyledCard>
  );
}
export default AlbumPlaylistCard;
