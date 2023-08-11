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
  const [ref, bounds] = useMeasure();
  const [playlistHeight, setPlaylistHeight] = useState<number | null>(null);
  const customerPanelHeight = 50;
  const panelPlayerHeight = 350;

  useEffect(() => {
    setPlaylistHeight(
      window.innerHeight - customerPanelHeight - panelPlayerHeight - 200
    );
  }, [window.innerHeight]);

  return (
    <PanelContainer ref={ref}>
      <CustomerPanel />
      <PanelPlayer />
      <Playlist playlist={playlist} height={playlistHeight} />
    </PanelContainer>
  );
}
