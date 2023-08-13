"use client";

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
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/server/database.types";
import { useRouter } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { Icons } from "../app/Icons";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";
import { motion } from "framer-motion";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const user = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const renderSideline = (menuName: string) =>
    selectedMenu === menuName ? (
      <motion.div
        layoutId="sideline"
        className="absolute right-0 h-8 w-1 bg-white "
      />
    ) : null;

  return (
    <NavContainer>
      <Link
        href="/"
        className="w-full flex flex-row align-middle justify-center 2xl:pr-5"
      >
        <LogoImage>
          <Image
            src="/images/logo2.png"
            alt="logo"
            fill
            sizes="3rem"
            className="object-contain "
            priority={true}
          />
        </LogoImage>
        <Logo className={righteous.className}>Cherry</Logo>
      </Link>

      <Search />

      <NavUl>
        <Menu onClick={() => handleMenuClick("Chart")}>
          {renderSideline("Chart")}
          <Icons.disc3 size={22} />
          <MenuSpan>Chart</MenuSpan>
        </Menu>
        <Menu onClick={() => handleMenuClick("Albums")}>
          {renderSideline("Albums")}
          <Icons.library size={22} />
          <MenuSpan>Albums</MenuSpan>
        </Menu>
        <Menu onClick={() => handleMenuClick("Artists")}>
          {renderSideline("Artists")}
          <Icons.listMusic size={22} />
          <MenuSpan>Playlist</MenuSpan>
        </Menu>

        <Menu onClick={() => handleMenuClick("comments")}>
          {renderSideline("comments")}
          <Icons.messageCircle size={22} />
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu onClick={() => handleMenuClick("setting")}>
          {renderSideline("setting")}
          <Icons.settings size={22} />
          <MenuSpan>Settings</MenuSpan>
        </Menu>

        <Menu>
          <ThemeSwitcher />
        </Menu>
        {user && (
          <Button
            onPress={handleSignOut}
            isIconOnly
            startContent={<Icons.logOut size={22} />}
            variant="light"
            className="text-white text-2xl mt-auto mb-2 -ml-1 z-50"
          />
        )}
      </NavUl>
    </NavContainer>
  );
}
