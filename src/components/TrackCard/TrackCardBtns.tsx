import { Track } from "@/lib/server/database.types";
import { Buttons } from "@/styles/TrackCard";
import { Dispatch, SetStateAction } from "react";
import LikeButton from "../Btns/LikeButton";
import {
  playlistActionDropdownItems,
  trackActionDropdownItems,
} from "../Dropdowns/DropdownItems";
import TrackCardDropDown from "./TrackCardDropDown";

interface TrackCardButtonsProps {
  isCardHover: boolean;
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  setIsDropdownHover: Dispatch<SetStateAction<boolean>>;
  iconColor: string;
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;

  track: Track;
}
function TrackCardButtons({
  track,
  isCardHover,
  setIsDropdownHover,
  iconColor,
  liked,
  setLiked,
  setIsCardHover,
}: TrackCardButtonsProps) {
  return (
    <>
      {isCardHover && (
        <Buttons>
          <LikeButton liked={liked} setLiked={setLiked} iconColor={iconColor} />
          <TrackCardDropDown
            track={track}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={trackActionDropdownItems}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
          />
        </Buttons>
      )}
    </>
  );
}
export default TrackCardButtons;
