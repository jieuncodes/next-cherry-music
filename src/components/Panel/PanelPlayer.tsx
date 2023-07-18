import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import AlbumCover from "./AlbumCover";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import PlayerController from "./PlayerControllers";

function PanelPlayer() {
  return (
    <PanelPlayerContainer>
      <AlbumCover />
      <TrackInfo />
      <ProgressBar />
      <PlayerController />
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
