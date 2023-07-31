import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { DropdownItemData } from "@/types/itemTypes";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  Dispatch,
  Key,
  MutableRefObject,
  SetStateAction,
  forwardRef,
} from "react";
import { Icons } from "../../app/Icons";
import { Track } from "../../lib/server/database.types";
import { PlaylistContainer } from "../../styles/Panel/Playlist";
import { parse } from "path";

interface DropDownProps {
  track: Track;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dropdownItems: DropdownItemData[];
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  cardRef?: MutableRefObject<HTMLButtonElement | null>;
}

function TrackCardDropDown({
  track,
  onMouseEnter,
  onMouseLeave,
  dropdownItems,
  setIsCardHover,
  cardRef,
}: DropDownProps) {
  const { addToPlaylist, removeFromPlaylist } = useLocalStoragePlaylist();

  const handleDropdownAction = (key: Key) => {
    switch (key) {
      case "play-next":
        break;
      case "add-to-queue":
        addToPlaylist(track);
        console.log("", setIsCardHover);
        setIsCardHover(false);
        break;
      case "add-to-playlist":
        break;
      case "go-to-album":
        break;
      case "go-to-artist":
        break;
      case "remove-item":
        const playlistIndex = cardRef?.current?.getAttribute(
          "data-playlist-index"
        );
        if (playlistIndex) {
          console.log("pi", parseInt(playlistIndex));
          removeFromPlaylist(parseInt(playlistIndex));
        }

        break;
      default:
        console.warn(`Unhandled action key: ${key}`);
        break;
    }
  };

  return (
    <Dropdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <Icons.moreVertical />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        variant="faded"
        aria-label="Dropdown menu with icons"
        onAction={(key) => handleDropdownAction(key)}
      >
        {dropdownItems.map((item) => (
          <DropdownItem key={item.key} startContent={item.icon}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
export default TrackCardDropDown;
