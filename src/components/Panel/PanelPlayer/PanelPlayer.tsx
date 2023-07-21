import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import AlbumCover from "./AlbumCover";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import PlayerController from "./PlayerControllers";
import { useRecoilState } from "recoil";
import { localStoragePlaylist } from "@/atoms";

function PanelPlayer() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);

  const firstPlaylistTrack = recoilPlaylist[0] || "[]";

  return (
    <PanelPlayerContainer>
      <AlbumCover
        albumCoverURL={
          firstPlaylistTrack?.albumImgUrl || "/images/default_album_img.png"
        }
      />
      <TrackInfo
        trackTitle={
          firstPlaylistTrack?.trackTitle ||
          "⬅︎ Play the music by clicking the card!"
        }
        artist={firstPlaylistTrack?.artist || "ARTIST"}
      />
      <ProgressBar></ProgressBar>
      <PlayerController />
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
