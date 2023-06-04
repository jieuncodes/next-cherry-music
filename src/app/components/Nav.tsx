"use client";

import { Avatar, Button, Navbar, Text } from "@nextui-org/react";
import { Righteous } from "@next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  display: "block",
});

export default function Nav() {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <Navbar>
      <Navbar.Content>
        {session ? (
          <>
            {user?.image ? (
              <Avatar src={user.image as string} zoomed />
            ) : (
              <Avatar text={user?.name?.charAt(0) as string} zoomed />
            )}
            <Navbar.Link color="inherit" onClick={() => signOut()}>
              Sign out
            </Navbar.Link>
          </>
        ) : (
          <Navbar.Item>
            <Button
              auto
              flat
              animated
              size="sm"
              light
              color="primary"
              onClick={() => signIn()}
            >
              <LoginIcon />
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
      <Navbar.Brand>
        <Text
          className={righteous.className}
          h1
          size="$3xl"
          css={{
            textGradient: "45deg, $yellow600 10%, $pink600",
            letterSpacing: "$normal",
          }}
          weight="bold"
        >
          Cherry
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Button.Group size="sm" light>
          <Button>
            <SearchIcon fontSize="large" />
          </Button>
          <Button>
            <LibraryMusicIcon fontSize="large" />
          </Button>
          <Button>
            <MenuIcon fontSize="large" />
          </Button>
        </Button.Group>
      </Navbar.Content>
    </Navbar>
  );
}
