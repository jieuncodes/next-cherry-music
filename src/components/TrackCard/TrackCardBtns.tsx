import { Buttons } from "@/styles/TrackCard";
import { Dispatch, SetStateAction } from "react";
import { trackActionDropdownItems } from "../Dropdowns/DropdownItems";
import TrackCardDropDown from "./TrackCardDropDown";
import { Track } from "@/lib/server/database.types";
import LikeTrackBtn from "../Btns/LikeTrackBtn";
import { useUser } from "@supabase/auth-helpers-react";

interface TrackCardButtonsProps {
  isCardHover: boolean;
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  setIsDropdownHover: Dispatch<SetStateAction<boolean>>;
  iconColor: string;
  setLiked: Dispatch<SetStateAction<boolean>>;
  track: Track;
}
function TrackCardButtons({
  track,
  isCardHover,
  setIsDropdownHover,
  setIsCardHover,
}: TrackCardButtonsProps) {
  const user = useUser();
  return (
    <>
      {isCardHover && (
        <Buttons>
          <LikeTrackBtn
            track={track}
            user={user}
            isBlack
            className="-top-[2px]"
          />
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
