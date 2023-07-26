import { localStoragePlaylist } from "@/atoms";
import { PanelPlayerContainer } from "@/styles/Panel/PanelPlayer";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useRecoilState } from "recoil";
import AlbumCover from "./AlbumCover";
import PlayerController from "./PlayerControllers";
import ProgressBar from "./ProgressBar";
import TrackInfo from "./TrackInfo";
import { useEffect, useRef, useState } from "react";

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
  const [currTrackIdx, setCurrTrackIdx] = useState(0);
  const currTrack = recoilPlaylist[currTrackIdx] || "[]";
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    setCurrTrackIdx(0);
  }, [recoilPlaylist]);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

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
      <ProgressBar></ProgressBar>
      <PlayerController
        currTrackIdx={currTrackIdx}
        setCurrTrackIdx={setCurrTrackIdx}
        playlistLength={recoilPlaylist.length}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
      />

      {currTrack?.youtubeId && (
        <div
          style={{ visibility: "hidden", position: "absolute", top: "-1000px" }}
        >
          <YouTube
            ref={playerRef}
            videoId={currTrack.youtubeId}
            opts={opts}
            onReady={(event) => {
              playerRef.current = event.target;
              event.target.playVideo();
              setIsPlaying(true);
            }}
          />
        </div>
      )}
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
