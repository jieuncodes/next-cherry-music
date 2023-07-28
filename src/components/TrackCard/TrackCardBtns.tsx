import { Button } from "@nextui-org/button";
import { Buttons } from "@/styles/TrackCard";
import { Icons } from "../../app/Icons";
import CardDropDown from "./TrackCardDropDown";
import { DropdownItemData } from "@/types/itemTypes";

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
          <CardDropDown
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            iconColor={iconColor}
            dropdownItems={dropdownItems}
          />
        </Buttons>
      )}
    </>
  );
}

export default TrackCardButtons;

const dropdownItems: DropdownItemData[] = [
  {
    key: "play-next",
    icon: <Icons.listVideo strokeWidth={1.5} />,
    label: "Play next",
  },
  {
    key: "add-to-queue",
    icon: <Icons.listMusic strokeWidth={1.5} />,
    label: "Add to queue",
  },
  {
    key: "add-to-playlist",
    icon: <Icons.listPlus strokeWidth={1.5} />,
    label: "Add to playlist",
  },
  {
    key: "go-to-album",
    icon: <Icons.disc strokeWidth={1.5} />,
    label: "Go to album",
  },
  {
    key: "go-to-artist",
    icon: <Icons.mic2 strokeWidth={1.5} />,
    label: "Go to artist",
  },
];
