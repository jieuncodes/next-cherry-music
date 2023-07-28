import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import PlaylistCards from "./PlaylistCards";

function Playlist() {
  return (
    <>
      <PlaylistContainer>
        <PanelSectionTitle>Playlist</PanelSectionTitle>
        <ShowAllBtn>show all</ShowAllBtn>
        <PlaylistCards />
      </PlaylistContainer>
    </>
  );
}
export default Playlist;
