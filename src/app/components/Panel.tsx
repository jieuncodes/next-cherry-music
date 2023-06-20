"use client";

import { Button, Loading, User } from "@nextui-org/react";
import { PanelContainer, UserStatus } from "../styles/Panel";
import { Bell } from "lucide-react";
export default function Panel() {
  return (
    <PanelContainer>
      <UserStatus>
        <Bell />
        <Button color="gradient" auto>
          Gradient
        </Button>
      </UserStatus>
    </PanelContainer>
  );
}
