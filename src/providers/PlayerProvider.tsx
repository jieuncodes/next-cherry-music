"use client";

import {
  currTrackIdxAtom,
  localStoragePlaylist,
  playStateAtom,
  playerReadyStateAtom,
} from "@/atoms";
import React, { createContext, useContext, useRef, ReactNode } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";

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
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);
  const currTrack = recoilPlaylist[currTrackIdx] || "[]";
  const [playerReady, setPlayerReady] = useRecoilState(playerReadyStateAtom);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useRecoilState(playStateAtom);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
    setIsPlaying(!isPlaying);
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
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnd={() => {
              setIsPlaying(false);
              setCurrTrackIdx(currTrackIdx + 1);
            }}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;