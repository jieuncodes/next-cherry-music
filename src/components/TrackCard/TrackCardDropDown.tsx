import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { DropdownItemData } from "@/types/itemTypes";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key } from "react";
import { Icons } from "../../app/Icons";
import { Track } from "../../lib/server/database.types";

interface DropDownProps {
  iconColor: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dropdownItems: DropdownItemData[];
  track: Track;
}

function CardDropDown({
  track,
  iconColor,
  onMouseEnter,
  onMouseLeave,
  dropdownItems,
}: DropDownProps) {
  const { playlist, addToPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();

  const handleDropdownAction = (key: Key) => {
    switch (key) {
      case "play-next":
        break;
      case "add-to-queue":
        addToPlaylist(track);
        break;
      case "add-to-playlist":
        break;
      case "go-to-album":
        break;
      case "go-to-artist":
        break;
      case "remove-item":
        removeFromPlaylist(track.id);
      default:
        console.warn(`Unhandled action key: ${key}`);
        break;
    }
  };

  return (
    <Dropdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <Icons.moreVertical color={iconColor} />
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
export default CardDropDown;
