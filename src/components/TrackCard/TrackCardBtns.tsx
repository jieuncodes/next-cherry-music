import { Button } from "@nextui-org/button";
import { Buttons } from "@/styles/TrackCard";
import { Icons } from "../Icons";
import DropdownComponent from "./TrackCardDropDown";

interface TrackCardButtonsProps {
  isCardHover: boolean;
  setIsDropdownHover: (isDropdownHover: boolean) => void;
  iconColor: string;
  liked: boolean;
  setLiked: (liked: boolean) => void;
}

function TrackCardButtons({
  isCardHover,
  setIsDropdownHover,
  iconColor,
  liked,
  setLiked,
}: TrackCardButtonsProps) {
  return (
    <>
      {isCardHover && (
        <Buttons>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setLiked(!liked)}
          >
            <Icons.heart color={iconColor} fill={liked ? iconColor : "none"} />
          </Button>
          <DropdownComponent
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            iconColor={iconColor}
          />
        </Buttons>
      )}
    </>
  );
}

export default TrackCardButtons;
