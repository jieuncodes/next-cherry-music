import {
  currTrackIdxAtom,
  localStoragePlaylist,
  playStateAtom,
  playerReadyStateAtom,
} from "@/atoms";
import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";
import AlbumCover from "./AlbumCover";
import PlayerController from "./PlayerControllers";
import ProgressBar from "./ProgressBar";
import TrackInfo from "./TrackInfo";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/providers/PlayerProvider";

function PanelPlayer() {
  const { togglePlayPause, playerRef } = usePlayer();

  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);
  const currTrack = recoilPlaylist[currTrackIdx] || "[]";

  useEffect(() => {
    setCurrTrackIdx(0);
  }, [recoilPlaylist]);

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
