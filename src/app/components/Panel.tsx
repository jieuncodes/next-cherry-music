"use client";

import { Loading, User } from "@nextui-org/react";
import { PanelContainer, UserStatus } from "../styles/Panel";
import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
export default function Panel() {
  const { data: session, status } = useSession();
  const { user } = session || {};

  return (
    <PanelContainer>
      <UserStatus>
        <Bell />
        {status && status === "loading" ? (
          <Loading type="points" color="currentColor" size="sm" />
        ) : (
          <User src="" name="username" pointer />
        )}
      </UserStatus>
    </PanelContainer>
  );
}
