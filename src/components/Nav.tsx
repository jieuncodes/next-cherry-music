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
import { Icons } from "./Icons";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

export default function Nav() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const user = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
          <Icons.disc3 size={25} />
          <MenuSpan>Chart</MenuSpan>
        </Menu>
        <Menu>
          <Icons.library size={25} />
          <MenuSpan>Albums</MenuSpan>
        </Menu>
        <Menu>
          <Icons.listMusic size={25} />
          <MenuSpan>Playlist</MenuSpan>
        </Menu>

        <Menu>
          <Icons.messageCircle size={25} />
          <MenuSpan>Comments</MenuSpan>
        </Menu>

        <Menu>
          <Icons.settings size={25} />
          <MenuSpan>Settings</MenuSpan>
        </Menu>
      {user && <Button
          onPress={handleSignOut}
          isIconOnly
          startContent={<Icons.logOut size={25} />}
          variant="light"
          className="text-white text-2xl mt-auto mb-2 -ml-1"
        />}
        
      </NavUl>
    </NavContainer>
  );
}
