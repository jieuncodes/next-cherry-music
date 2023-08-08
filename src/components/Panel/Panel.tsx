"use client";

import { PanelContainer } from "@/styles/Panel/Panel";
import CustomerPanel from "./CustomerPanel";
import PanelPlayer from "./PanelPlayer/PanelPlayer";
import Playlist from "../Playlist/Playlist";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";

export default function Panel() {
  const { playlist } = useLocalStoragePlaylist();

  return (
    <PanelContainer>
      <CustomerPanel />
      <PanelPlayer />
      <Playlist playlist={playlist} />
    </PanelContainer>
  );
}
