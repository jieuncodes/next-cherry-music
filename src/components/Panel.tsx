"use client";

import { Bell, User2Icon } from "lucide-react";
import { PanelContainer, UserStatus } from "@/styles/Panel";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms";
import { Button } from "@nextui-org/button";
import { useUser } from "@supabase/auth-helpers-react";
import { Avatar } from "@nextui-org/avatar";

export default function Panel() {
  const [isOpen, setIsOpen] = useRecoilState(authModalState);
  const user = useUser();

  return (
    <PanelContainer>
      <UserStatus>
        <Bell />
        {user ? (
          <Avatar
            classNames={{
              base: "bg-gradient-to-br from-[#ffafe67b] to-[#ff005da2]",
              icon: "text-black/80",
            }}
            name={user.user_metadata.user_name}
            src=""
          />
        ) : (
          <Button
            startContent={<User2Icon />}
            variant="ghost"
            radius="full"
            isIconOnly
            onPress={() => setIsOpen(true)}
          />
        )}
      </UserStatus>
    </PanelContainer>
  );
}
