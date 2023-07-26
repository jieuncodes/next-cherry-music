import { localStoragePlaylist } from "@/atoms";
import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import YouTube from "react-youtube";
import { useRecoilState } from "recoil";
import AlbumCover from "./AlbumCover";
import PlayerController from "./PlayerControllers";
import ProgressBar from "./ProgressBar";
import TrackInfo from "./TrackInfo";

const opts = {
  height: "1",
  width: "1",
  playerVars: {
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    loop: 1,
    fs: 0,
    cc_load_policty: 0,
    iv_load_policy: 3,
    autohide: 1,
    rel: 0,
  },
};

function PanelPlayer() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  console.log("recoilPlaylist", recoilPlaylist);
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

      {firstPlaylistTrack?.youtubeId && (
        <div
          style={{ visibility: "hidden", position: "absolute", top: "-1000px" }}
        >
          <YouTube
            videoId={firstPlaylistTrack.youtubeId}
            opts={opts}
            onReady={(event) => event.target.playVideo()}
          />
        </div>
      )}
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
