import { PlaylistModalState } from "@/atoms";
import { Track } from "@/lib/server/database.types";
import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import { useRecoilState } from "recoil";
import PlaylistCards from "./PlaylistCards";
import { useEffect } from "react";

function Playlist({
  playlist,
  height,
}: {
  playlist: Track[];
  height: number | null;
}) {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);
  const playlistStyle = {
    height: `${height}px`,
  };
  return (
    <PlaylistContainer style={playlistStyle}>
      <PanelSectionTitle>Playlist</PanelSectionTitle>
      <ShowAllBtn onClick={() => setIsOpen(true)}>show all</ShowAllBtn>
      <PlaylistCards playlist={playlist} />
    </PlaylistContainer>
  );
}
export default Playlist;
