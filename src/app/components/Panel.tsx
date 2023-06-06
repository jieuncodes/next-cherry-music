"use client";

import { User } from "@nextui-org/react";
import { PanelContainer, UserStatus } from "../styles/Panel";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
export default function Panel() {
  return (
    <PanelContainer>
      <UserStatus>
        <NotificationsNoneIcon />
        <User src="" name="username" pointer />
      </UserStatus>
    </PanelContainer>
  );
}
