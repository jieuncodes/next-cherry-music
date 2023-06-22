"use client";
import {
  BarChart2,
  ListMusic,
  LogOut,
  MessageCircle,
  Settings,
} from "lucide-react";

import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import {
  MenuSpan,
  LogoImage,
  Logo,
  NavContainer,
  Menu,
  NavUl,
} from "@/styles/Nav";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  return (
    <NavContainer>
      <Link
        href="/"
        className="w-full flex flex-row align-middle justify-center xl:pr-7 justify-self-start"
      >
        <LogoImage>
          <Image
            src="/images/logo2.png"
            alt="logo"
            width={50}
            height={50}
            className="object-contain self-center"
            priority={true}
          />
        </LogoImage>
        <Logo className={righteous.className}>Cherry</Logo>
      </Link>

      <Search />

      <NavUl>
        <Menu>
          <BarChart2 size={30} />
          <MenuSpan>Chart</MenuSpan>
        </Menu>

        <Menu>
          <ListMusic size={30} />
          <MenuSpan>Playlist</MenuSpan>
        </Menu>

        <Menu>
          <MessageCircle size={30} />
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu>
          <Settings size={30} />
          <MenuSpan>Settings</MenuSpan>
        </Menu>

        <Menu className="mt-auto">
          <LogOut size={30} />
          <MenuSpan>Log out</MenuSpan>
        </Menu>
      </NavUl>
    </NavContainer>
  );
}
