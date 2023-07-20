import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import AlbumCover from "./AlbumCover";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import PlayerController from "./PlayerControllers";
import { Database } from "@/lib/server/database.types";

function PanelPlayer({}: {
  track: Database["public"]["Tables"]["tracks"]["Row"];
}) {
  const firstTrackOnLocalStorage = JSON.parse(
    localStorage.getItem("playlist") || "[]"
  )[0];
  console.log("firstTrack", firstTrackOnLocalStorage.albumImgUrl);

  return (
    <PanelPlayerContainer>
      <AlbumCover
        albumCoverURL={
          firstTrackOnLocalStorage?.albumImgUrl ||
          "/images.default_album_img.png"
        }
      />
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
