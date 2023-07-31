import { Track } from "@/lib/server/database.types";
import { DropdownItemData } from "@/types/itemTypes";
import { Dispatch, Key, MutableRefObject, SetStateAction } from "react";
import useLocalStoragePlaylist from "./useLocalStoragePlaylist";

interface DropDownProps {
  track: Track;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dropdownItems: DropdownItemData[];
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  setIsDropdownHover: Dispatch<SetStateAction<boolean>>;
  cardRef?: MutableRefObject<HTMLButtonElement | null>;
}

function useDropdownHandlers(props: DropDownProps) {
  const { addToPlaylist, removeFromPlaylist } = useLocalStoragePlaylist();

  const handleDropdownAction = (key: Key) => {
    switch (key) {
      case "add-to-queue":
        addToPlaylist(props.track);
        props.setIsCardHover(false);
        props.setIsDropdownHover(false);
        break;
      case "add-to-playlist":
        props.setIsCardHover(false);
        props.setIsDropdownHover(false);
        break;
      case "remove-item":
        const playlistIndex = props.cardRef?.current?.getAttribute(
          "data-playlist-index"
        );
        if (playlistIndex) {
          removeFromPlaylist(parseInt(playlistIndex));
        }
        break;
      default:
        console.warn(`Unhandled action key: ${key}`);
    }
  };

  return {
    handleDropdownAction,
  };
}
export default useDropdownHandlers;
