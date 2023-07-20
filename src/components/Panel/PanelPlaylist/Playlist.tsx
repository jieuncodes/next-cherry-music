import {
  PanelSectionTitle,
  PlaylistContainer,
  ShowAllBtn,
} from "@/styles/Panel/Playlist";
import PlaylistCards from "./PlaylistCards";

function Playlist() {
  const tracks = JSON.parse(localStorage.getItem("playlist") || "[]");

  return (
    <PlaylistContainer>
      <PanelSectionTitle>Playlist</PanelSectionTitle>
      <ShowAllBtn>show all</ShowAllBtn>
      <PlaylistCards tracks={tracks} />
    </PlaylistContainer>
  );
}
export default Playlist;
