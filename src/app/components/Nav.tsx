"use client";
import {
  BarChart2,
  ListMusic,
  LogOut,
  MessageCircle,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  MenuSpan,
  Logo,
  NavContainer,
  Menu,
  NavUl,
  NavBtnSpan,
  NavBtnIcon,
} from "../styles/Nav";
import { Button } from "@nextui-org/react";
import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <NavContainer>
      <Link
        href="/"
        className="w-full flex flex-row align-middle justify-center pr-7 justify-self-start"
      >
        <Image
          src="/images/logo2.png"
          alt="logo"
          width={37}
          height={37}
          className="object-contain self-center"
        />
        <Logo className={righteous.className}>Cherry</Logo>
      </Link>

      <Search />

      <NavUl>
        <Menu>
          <BarChart2 />
          <MenuSpan>Chart</MenuSpan>
        </Menu>

        <Menu>
          <ListMusic />
          <MenuSpan>Playlist</MenuSpan>
        </Menu>

        <Menu>
          <MessageCircle />
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu>
          <Settings />
          <MenuSpan>Settings</MenuSpan>
        </Menu>
      </NavUl>
      <Button light animated>
        <LogOut />
        <NavBtnSpan>Log out</NavBtnSpan>
      </Button>
    </NavContainer>
  );
}
