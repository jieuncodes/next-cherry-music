import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import { useRecoilState } from "recoil";
import PlaylistCards from "./PlaylistCards";
import { PlaylistModalState } from "@/atoms";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";

function Playlist() {
  const [isOpen, setIsOpen] = useRecoilState(PlaylistModalState);
  const { playlist } = useLocalStoragePlaylist();

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
