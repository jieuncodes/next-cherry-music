"use client";

import {
  RepeatState,
  ShuffleState,
  currPlayingTrackYoutubeId,
  currPlaylistTrackIdx,
  localStoragePlaylist,
  playStateAtom,
  playerReadyStateAtom,
} from "@/atoms";
import usePlayerControls from "@/hooks/usePlayerControls";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface PlayerContextType {
  playerRef: React.RefObject<YouTubePlayer>;
  isPlaying: boolean;
  togglePlayPause: () => void;
}
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

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
    origin: "https://next-cherry-music.vercel.app/",
  },
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

function PlayerProvider({ children }: PlayerProviderProps) {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);
  const currTrack = recoilPlaylist[currTrackIdx] || "[]";

  const [playerReady, setPlayerReady] = useRecoilState(playerReadyStateAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(playStateAtom);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const isShuffleOn = useRecoilValue(ShuffleState);
  const isRepeatOn = useRecoilValue(RepeatState);
  const { playShuffledNextTrack } = usePlayerControls();

  const setCurrPlaylingTrackYoutubeId = useSetRecoilState(
    currPlayingTrackYoutubeId
  );

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    if (isShuffleOn) {
      playShuffledNextTrack();
      return;
    } else if (isRepeatOn) {
      playerRef.current?.playVideo();

      return;
    }
    setCurrTrackIdx(currTrackIdx + 1);
  };

  const value = {
    playerRef,
    isPlaying,
    togglePlayPause,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {currTrack?.youtubeId && (
        <div
          style={{ visibility: "hidden", position: "absolute", top: "-1000px" }}
        >
          <YouTube
            ref={playerRef}
            videoId={currTrack.youtubeId}
            opts={opts}
            onReady={(event) => {
              setPlayerReady(true);
              playerRef.current = event.target;
              event.target.playVideo();
            }}
            onPlay={() => {
              setIsPlaying(true);
              setCurrPlaylingTrackYoutubeId(currTrack.youtubeId || "");
            }}
            onPause={() => setIsPlaying(false)}
            onEnd={handleTrackEnd}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
