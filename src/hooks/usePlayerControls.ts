import { useRecoilState, useRecoilValue } from "recoil";
import {
  ShuffleState,
  currPlaylistTrackIdx,
  localStoragePlaylist,
} from "@/atoms";

const usePlayerControls = () => {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);
  const isShuffleOn = useRecoilValue(ShuffleState);

  const playShuffledNextTrack = () => {
    let nextTrackIdx;
    do {
      nextTrackIdx = Math.floor(Math.random() * recoilPlaylist.length);
    } while (nextTrackIdx === currTrackIdx);
    setCurrTrackIdx(nextTrackIdx);
  };

  const handleSkipBack = () => {
    if (isShuffleOn) {
      playShuffledNextTrack();
      return;
    }
    if (currTrackIdx > 0) {
      setCurrTrackIdx(currTrackIdx - 1);
    }
  };

  const handleSkipForward = () => {
    if (isShuffleOn) {
      playShuffledNextTrack();
      return;
    }
    if (currTrackIdx < recoilPlaylist.length - 1) {
      setCurrTrackIdx(currTrackIdx + 1);
    }
  };

  const handlePlayClickedTrack = (index: number) => {
    setCurrTrackIdx(index);
  };

  return {
    handleSkipBack,
    handleSkipForward,
    handlePlayClickedTrack,
    playShuffledNextTrack,
  };
};

export default usePlayerControls;
