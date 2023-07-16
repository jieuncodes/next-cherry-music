import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Icons } from "../Icons";

type DropdownItemData = {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
};
const dropdownItems: DropdownItemData[] = [
  {
    key: "play-next",
    icon: Icons.listVideo,
    label: "Play next",
  },
  {
    key: "add-to-queue",
    icon: Icons.listMusic,
    label: "Add to queue",
  },
  {
    key: "add-to-playlist",
    icon: Icons.listPlus,
    label: "Add to playlist",
  },
  {
    key: "go-to-album",
    icon: Icons.disc,
    label: "Go to album",
  },
  {
    key: "go-to-artist",
    icon: Icons.mic2,
    label: "Go to artist",
  },
];
interface DropDownProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  iconColor: string;
}

export const DropdownComponent: React.FC<DropDownProps> = ({
  onMouseEnter,
  onMouseLeave,
  iconColor,
}) => {
  return (
    <Dropdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <Icons.moreVertical color={iconColor} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        items={dropdownItems}
        onAction={(key) => alert(key)}
      >
        {(item: any) => {
          const typedItem = item as {
            key: string;
            label: string;
            icon: React.ComponentType<any>;
          };
          const IconComponent = typedItem.icon;

          return (
            <DropdownItem
              key={typedItem.key}
              startContent={<IconComponent strokeWidth={1.5} />}
            >
              {typedItem.label}
            </DropdownItem>
          );
        }}
      </DropdownMenu>
    </Dropdown>
  );
};
