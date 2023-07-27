"use client";

import {
  currTrackCurrentTimeAtom,
  currTrackDurationAtom,
  currTrackIdxAtom,
  localStoragePlaylist,
} from "@/atoms";
import { usePlayer } from "@/providers/PlayerProvider";
import {
  AlbumCoverBox,
  AlbumCoverImg,
  PlayBarContainer,
  Player,
  TimeFlow,
  TrackInfoBox,
  Title,
  Artist,
} from "@/styles/PlayBar";
import { useRecoilState, useRecoilValue } from "recoil";
import PlayerController from "./Panel/PanelPlayer/PlayerControllers";
import ProgressBar from "./Panel/PanelPlayer/ProgressBar";

function PlayBar() {
  const { togglePlayPause, playerRef } = usePlayer();

  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);

  const currTrack = recoilPlaylist[currTrackIdx] || "[]";
  const [currentTime, setCurrentTime] = useRecoilState(
    currTrackCurrentTimeAtom
  );
  const duration = useRecoilValue(currTrackDurationAtom);
  return (
    <PlayBarContainer>
      <ProgressBar playerRef={playerRef} isOnPlayBar={true} />
      <Player>
        <PlayerController togglePlayPause={togglePlayPause} isPlayBar={true} />
        <TimeFlow>
          {currentTime} / {duration}
        </TimeFlow>
        <TrackInfoBox>
          <AlbumCoverBox>
            <AlbumCoverImg
              src={currTrack.albumImgUrl || "/images/default_album_img.png"}
            />
          </AlbumCoverBox>
          <Title>{currTrack.trackTitle}</Title>
          <Artist>{currTrack.artist}</Artist>
        </TrackInfoBox>

        <div></div>
      </Player>
    </PlayBarContainer>
  );
}
export default PlayBar;
