import TransparentRoundBtn from "@/components/Btns/TransparentRoundBtn";
import { Icons } from "@/components/Icons";
import FlatIconButton from "@/components/Btns/FlatIconBtn";
import { Controllers } from "@/styles/Panel/PanelPlayer";
import { currTrackIdxAtom, localStoragePlaylist, playStateAtom } from "@/atoms";
import { useRecoilState } from "recoil";

interface PlayerControllerProps {
  togglePlayPause: () => void;
  isPlayBar?: boolean;
}

function PlayerController({
  togglePlayPause,
  isPlayBar,
}: PlayerControllerProps) {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(playStateAtom);

  const handleShuffle = () => {};
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
  return (
    <Controllers>
      {!isPlayBar && (
        <TransparentRoundBtn
          startContent={<Icons.shuffle size={17} />}
          onPress={handleShuffle}
          size="sm"
        />
      )}
      <TransparentRoundBtn
        startContent={<Icons.skipBack size={17} />}
        onPress={handleSkipBack}
        size="sm"
      />
      <FlatIconButton
        startContent={
          isPlaying ? (
            <Icons.pause size={18} fill="black" />
          ) : (
            <Icons.play size={18} fill="black" />
          )
        }
        onClick={togglePlayPause}
      />
      <TransparentRoundBtn
        startContent={<Icons.skipForward size={17} />}
        onPress={handleSkipForward}
        size="sm"
      />
      {!isPlayBar && (
        <TransparentRoundBtn
          startContent={<Icons.repeat size={17} />}
          onPress={handleShuffle}
          size="sm"
        />
      )}
    </Controllers>
  );
}
export default PlayerController;
