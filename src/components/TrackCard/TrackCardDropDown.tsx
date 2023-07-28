import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { Icons } from "../../app/Icons";
import { DropdownItemData } from "@/types/itemTypes";

interface DropDownProps {
  iconColor: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dropdownItems: DropdownItemData[];
}

function CardDropDown({
  iconColor,
  onMouseEnter,
  onMouseLeave,
  dropdownItems,
}: DropDownProps) {
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
        onAction={(key) => alert(key)}
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
