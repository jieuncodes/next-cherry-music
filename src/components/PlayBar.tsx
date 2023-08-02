"use client";

import {
  currTrackCurrentTimeAtom,
  currTrackDurationAtom,
  currPlaylistTrackIdx,
  localStoragePlaylist,
} from "@/atoms";
import { usePlayer } from "@/providers/PlayerProvider";
import {
  AlbumCoverBox,
  AlbumCoverImg,
  Artist,
  Btns,
  PlayBarContainer,
  PlayListBtn,
  Player,
  TimeFlow,
  Title,
  TrackInfoBox,
} from "@/styles/PlayBar";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icons } from "../app/Icons";
import PlayerController from "./Panel/PanelPlayer/PlayerControllers";
import ProgressBar from "./Panel/PanelPlayer/ProgressBar";
import { floatToTime } from "@/lib/utils";

function PlayBar() {
  const { togglePlayPause, playerRef } = usePlayer();
  const [liked, setLiked] = useState(false);
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);

  const currTrack = recoilPlaylist[currTrackIdx] || "[]";
  const [currentTime, setCurrentTime] = useRecoilState(
    currTrackCurrentTimeAtom
  );
  const duration = useRecoilValue(currTrackDurationAtom);
  return (
    <PlayBarContainer>
      <ProgressBar playerRef={playerRef} isPlayBar={true} />
      <Player>
        <PlayerController togglePlayPause={togglePlayPause} isPlayBar={true} />
        <TimeFlow>
          <span>{floatToTime(currentTime / 60)}</span>
          <span>/</span>
          <span> {floatToTime(duration / 60)}</span>
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
