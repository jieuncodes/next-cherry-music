"use client";

import { PanelContainer, UserStatus } from "../styles/Panel";
import { Bell, LogIn, LogInIcon, User2, UserCircle2 } from "lucide-react";
import { Popover, User, Button, Grid } from "@nextui-org/react";
import AuthPopover from "./AuthPopover";

export default function Panel() {
  return (
    <PanelContainer>
      <UserStatus>
        <Bell />
        <Grid>
          <Popover placement="bottom-right">
            <Popover.Trigger>
              <Button icon={<User2 />} auto color="gradient" rounded ghost />
            </Popover.Trigger>
            <Popover.Content>
              <AuthPopover />
            </Popover.Content>
          </Popover>
        </Grid>
      </UserStatus>
    </PanelContainer>
  );
}
