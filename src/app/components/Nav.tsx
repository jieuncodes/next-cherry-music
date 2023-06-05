"use client";

import { useSession } from "next-auth/react";
import {
  MenuIcon,
  MenuSpan,
  Logo,
  LogoBox,
  NavContainer,
  Menu,
  NavUl,
  NavBtnSpan,
  NavBtn,
  NavBtnIcon,
} from "../styles/Nav";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Button } from "@nextui-org/react";

export default function Nav() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <NavContainer>
      <LogoBox>
        <Logo>Cherry</Logo>
      </LogoBox>
      <NavUl>
        <Menu>
          <MenuIcon>
            <SignalCellularAltIcon />
          </MenuIcon>
          <MenuSpan>Chart</MenuSpan>
        </Menu>

        <Menu>
          <MenuIcon>
            <LibraryMusicIcon />
          </MenuIcon>
          <MenuSpan>Playlist</MenuSpan>
        </Menu>

        <Menu>
          <MenuIcon>
            <ChatBubbleOutlineIcon />
          </MenuIcon>
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu>
          <MenuIcon>
            <SettingsIcon />
          </MenuIcon>
          <MenuSpan>Settings</MenuSpan>
        </Menu>
      </NavUl>
      <Button light animated>
        <NavBtnIcon>
          <LogoutIcon />
        </NavBtnIcon>
        <NavBtnSpan>Log out</NavBtnSpan>
      </Button>
    </NavContainer>
  );
}
