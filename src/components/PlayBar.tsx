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
  PlayListBtn,
  Btns,
} from "@/styles/PlayBar";
import { useRecoilState, useRecoilValue } from "recoil";
import PlayerController from "./Panel/PanelPlayer/PlayerControllers";
import ProgressBar from "./Panel/PanelPlayer/ProgressBar";
import { Icons } from "../app/Icons";
import { useState } from "react";

function PlayBar() {
  const { togglePlayPause, playerRef } = usePlayer();
  const [liked, setLiked] = useState(false);
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
          <Artist>
            {currTrack.artist}
            {currTrack.albumTitle ? " • currTrack.albumTitle" : ""}
          </Artist>
        </TrackInfoBox>
        <Btns>
          <Icons.heart
            color="#ff5173"
            size={20}
            fill={liked ? "#ff5173" : "none"}
            style={{ marginTop: 2 }}
          />
          <Icons.moreVertical style={{ marginLeft: 10, marginBottom: 3 }} />
        </Btns>

        <PlayListBtn>
          <Icons.chevronUp />
        </PlayListBtn>
      </Player>
    </PlayBarContainer>
  );
}
export default PlayBar;
