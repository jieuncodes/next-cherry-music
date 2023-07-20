import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import AlbumCover from "./AlbumCover";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import PlayerController from "./PlayerControllers";

function PanelPlayer() {
  const firstTrackOnLocalStorage = JSON.parse(
    localStorage.getItem("playlist") || "[]"
  )[0];

  return (
    <PanelPlayerContainer>
      <AlbumCover albumCoverURL={firstTrackOnLocalStorage?.albumImgUrl} />
      <TrackInfo
        trackTitle={firstTrackOnLocalStorage?.trackTitle}
        artist={firstTrackOnLocalStorage?.artist}
      />
      <ProgressBar></ProgressBar>
      <PlayerController />
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
