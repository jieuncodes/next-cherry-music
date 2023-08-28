import { DropdownItemData } from "@/types/itemTypes";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Icons } from "../../app/Icons";
import useDropdownHandlers from "@/hooks/useDropdownHandlers";
import { Track } from "@/lib/server/database.types";

interface DropDownProps {
  track: Track;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dropdownItems: DropdownItemData[];
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  setIsDropdownHover: Dispatch<SetStateAction<boolean>>;
  cardRef?: MutableRefObject<HTMLButtonElement | null>;
}

function TrackCardDropDown(props: DropDownProps) {
  const { handleDropdownAction } = useDropdownHandlers(props);
  return (
    <Dropdown
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
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
        {props.dropdownItems.map((item) => (
          <DropdownItem key={item.key} startContent={item.icon}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
export default TrackCardDropDown;
