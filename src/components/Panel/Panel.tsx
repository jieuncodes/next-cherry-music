"use client";

import { PanelContainer } from "@/styles/Panel/Panel";
import CustomerPanel from "./CustomerPanel";
import PanelPlayer from "./PanelPlayer/PanelPlayer";
import Playlist from "./PanelPlaylist/Playlist";

export default function Panel() {
  return (
    <PanelContainer>
      <CustomerPanel />
      <PanelPlayer />
      <Playlist />
    </PanelContainer>
  );
}
