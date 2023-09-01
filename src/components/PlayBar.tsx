"use client";

import {
  currPlaylistTrackIdx,
  currTrackCurrentTimeAtom,
  currTrackDurationAtom,
  localStoragePlaylist,
} from "@/atoms";
import { usePlayer } from "@/providers/PlayerProvider";
import { Btns, PlayBarContainer, PlayListBtn, Player } from "@/styles/PlayBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icons } from "../app/Icons";
import PlayerController from "./Panel/PanelPlayer/PlayerControllers";
import ProgressBar from "./Panel/PanelPlayer/ProgressBar";
import { Track } from "@/lib/server/database.types";
import { useUser } from "@supabase/auth-helpers-react";
import TimeDisplay from "./TimeDisplay";
import PlayBarTrackInfo from "./PlayBarTrackInfo";
import LikeBtn from "./Btns/LikeBtn";

function PlayBar() {
  const { togglePlayPause, playerRef } = usePlayer();
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);
  const user = useUser();
  const currTrack: Track = recoilPlaylist[currTrackIdx] || {};

  const [currentTime, setCurrentTime] = useRecoilState(
    currTrackCurrentTimeAtom
  );
  const duration = useRecoilValue(currTrackDurationAtom);
  return (
    <PlayBarContainer>
      <ProgressBar playerRef={playerRef} isPlayBar={true} />
      <Player>
        <PlayerController togglePlayPause={togglePlayPause} isPlayBar={true} />
        <TimeDisplay currentTime={currentTime} duration={duration} />
        <PlayBarTrackInfo track={currTrack} />
        <Btns>
          <LikeBtn track={currTrack} user={user} />
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
