"use client";

import { Bell, User2Icon } from "lucide-react";
import { PanelContainer, UserStatus } from "@/styles/Panel";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms";
import { Button } from "@nextui-org/button";

export default function Panel() {
  const [isOpen, setIsOpen] = useRecoilState(authModalState);

  return (
    <PanelContainer>
      <UserStatus>
        <Bell />
        {/* <MoreVertical /> */}
        <Button
          startContent={<User2Icon />}
          variant="ghost"
          radius="full"
          isIconOnly
          onPress={() => setIsOpen(true)}
        />
      </UserStatus>
    </PanelContainer>
  );
}
