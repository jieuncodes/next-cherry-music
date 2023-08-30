"use client";

import { Database } from "@/lib/server/database.types";
import {
  Logo,
  LogoImage,
  Menu,
  MenuSpan,
  NavContainer,
  NavUl,
} from "@/styles/Nav";
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../app/Icons";
import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";

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
    router.push(`/${menuName.toLowerCase()}`);
  };

  const renderSideline = (menuName: string) =>
    selectedMenu === menuName ? (
      <motion.div
        layoutId="sideline"
        className="absolute right-0 h-10 w-full bg-white/10 mt-0 rounded-l-full"
      />
    ) : null;

  // const pathname = usePathname();
  // console.log("pathname", pathname);
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
        <Menu onClick={() => handleMenuClick("geo")}>
          {renderSideline("geo")}
          <Icons.globe size={22} />
          <MenuSpan>World</MenuSpan>
        </Menu>
        {/* <Menu onClick={() => handleMenuClick("Artists")}>
          {renderSideline("Artists")}
          <Icons.listMusic size={22} />
          <MenuSpan>Playlist</MenuSpan>
        </Menu> */}

        {/* <Menu onClick={() => handleMenuClick("comments")}>
          {renderSideline("comments")}
          <Icons.messageCircle size={22} />
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu onClick={() => handleMenuClick("setting")}>
          {renderSideline("setting")}
          <Icons.settings size={22} />
          <MenuSpan>Settings</MenuSpan>
        </Menu> */}

        {/* <Menu>
          <ThemeSwitcher />
        </Menu> */}

        {user && (
          <Button
            onPress={handleSignOut}
            isIconOnly
            startContent={<Icons.logOut size={22} />}
            variant="light"
            className="text-white text-2xl mt-auto mb-2 -ml-1 z-50"
          />
        )}
        <span className="absolute bottom-0 mb-1">
          The site has been deployed, but still under construction!!
        </span>
      </NavUl>
    </NavContainer>
  );
}
