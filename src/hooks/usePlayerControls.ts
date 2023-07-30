import { useRecoilState } from "recoil";
import { currTrackIdxAtom, localStoragePlaylist, playStateAtom } from "@/atoms";

const usePlayerControls = () => {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);

  const handleShuffle = () => {
    // TODO: Implement shuffle
  };

  const handleSkipBack = () => {
    if (currTrackIdx > 0) {
      setCurrTrackIdx(currTrackIdx - 1);
    }
  };

  const handleSkipForward = () => {
    if (currTrackIdx < recoilPlaylist.length - 1) {
      setCurrTrackIdx(currTrackIdx + 1);
    }
  };

  const handlePlayClickedTrack = (index: number) => {
    setCurrTrackIdx(index);
  };

  return {
    handleShuffle,
    handleSkipBack,
    handleSkipForward,
    handlePlayClickedTrack,
  };
};

export default usePlayerControls;
