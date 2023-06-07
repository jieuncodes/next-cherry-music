"use client";

import { Loading, User } from "@nextui-org/react";
import { PanelContainer, UserStatus } from "../styles/Panel";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSession } from "next-auth/react";
export default function Panel() {
  const { data: session, status } = useSession();
  const { user } = session || {};

  return (
    <PanelContainer>
      <UserStatus>
        <NotificationsNoneIcon />
        {status && status === "loading" ? (
          <Loading type="points" color="currentColor" size="sm" />
        ) : (
          <User src="" name="username" pointer />
        )}
      </UserStatus>
    </PanelContainer>
  );
}
