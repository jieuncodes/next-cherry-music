"use client";

import { PanelContainer } from "@/styles/Panel/Panel";
import CustomerPanel from "./CustomerPanel";
import PanelPlayer from "./PanelPlayer/PanelPlayer";
import Playlist from "../Playlist/Playlist";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";

export default function Panel() {
  const { playlist } = useLocalStoragePlaylist();
  const [playlistHeight, setPlaylistHeight] = useState<number | null>(null);
  const customerPanelHeight = 50;
  const panelPlayerHeight = 350;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerHeight < 800) {
          setPlaylistHeight(
            window.innerHeight - customerPanelHeight - panelPlayerHeight - 120
          );
        } else {
          setPlaylistHeight(
            window.innerHeight - customerPanelHeight - panelPlayerHeight - 200
          );
        }
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <PanelContainer>
      <CustomerPanel />
      <PanelPlayer />
      <Playlist playlist={playlist} height={playlistHeight} />
    </PanelContainer>
  );
}
