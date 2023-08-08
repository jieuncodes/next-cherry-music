import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import { useRecoilState } from "recoil";
import PlaylistCards from "./PlaylistCards";
import { PlaylistModalState } from "@/atoms";
import { Track } from "@/lib/server/database.types";

function Playlist({ playlist }: { playlist: Track[] }) {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);

  return (
    <>
      <PlaylistContainer>
        <PanelSectionTitle>Playlist</PanelSectionTitle>
        <ShowAllBtn onClick={() => setIsOpen(true)}>show all</ShowAllBtn>
        <PlaylistCards playlist={playlist} />
      </PlaylistContainer>
    </>
  );
}
export default Playlist;
