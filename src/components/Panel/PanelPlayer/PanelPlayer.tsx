import { currTrackIdxAtom, localStoragePlaylist } from "@/atoms";
import { usePlayer } from "@/providers/PlayerProvider";
import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AlbumCover from "./AlbumCover";
import PlayerController from "./PlayerControllers";
import ProgressBar from "./ProgressBar";
import TrackInfo from "./TrackInfo";

function PanelPlayer() {
  const { togglePlayPause, playerRef } = usePlayer();

  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);
  const currTrack = recoilPlaylist[currTrackIdx] || "[]";

  useEffect(() => {
    setCurrTrackIdx(0);
  }, [recoilPlaylist.length]);

  return (
    <PanelPlayerContainer>
      <AlbumCover
        albumCoverURL={
          currTrack?.albumImgUrl || "/images/default_album_img.png"
        }
      />
      <TrackInfo
        trackTitle={
          currTrack?.trackTitle || "⬅︎ Play the music by clicking the card!"
        }
        artist={currTrack?.artist || "ARTIST"}
      />
      <ProgressBar playerRef={playerRef} />
      <PlayerController togglePlayPause={togglePlayPause} />
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
