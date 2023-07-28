import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import { useRecoilState } from "recoil";
import PlaylistCards from "./PlaylistCards";
import { PlaylistModalState } from "@/atoms";

function Playlist() {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);
  return (
    <>
      <PlaylistContainer>
        <PanelSectionTitle>Playlist</PanelSectionTitle>
        <ShowAllBtn onClick={() => setIsOpen(true)}>show all</ShowAllBtn>
        <PlaylistCards />
      </PlaylistContainer>
    </>
  );
}
export default Playlist;
