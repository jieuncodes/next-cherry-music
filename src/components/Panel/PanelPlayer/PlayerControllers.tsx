import { Icons } from "@/app/Icons";
import {
  RepeatState,
  ShuffleState,
  currPlaylistTrackIdx,
  localStoragePlaylist,
  playStateAtom,
} from "@/atoms";
import FlatIconButton from "@/components/Btns/FlatIconBtn";
import TransparentRoundBtn from "@/components/Btns/TransparentRoundBtn";
import usePlayerControls from "@/hooks/usePlayerControls";
import { Controllers } from "@/styles/Panel/PanelPlayer";
import { useRecoilState } from "recoil";

interface PlayerControllerProps {
  togglePlayPause: () => void;
  isPlayBar?: boolean;
}

function PlayerController({
  togglePlayPause,
  isPlayBar,
}: PlayerControllerProps) {
  const [isPlaying, setIsPlaying] = useRecoilState(playStateAtom);
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const { handleSkipBack, handleSkipForward } = usePlayerControls();
  const [isShuffleOn, setIsShuffleOn] = useRecoilState(ShuffleState);
  const [isRepeatOn, setIsRepeatOn] = useRecoilState(RepeatState);

  return (
    <Controllers>
      {!isPlayBar && (
        <TransparentRoundBtn
          startContent={<Icons.shuffle size={17} />}
          onPress={() => setIsShuffleOn(!isShuffleOn)}
          size="sm"
          isShuffleOn={isShuffleOn}
        />
      )}
      <TransparentRoundBtn
        isDisabled={currTrackIdx === 0}
        startContent={<Icons.skipBack size={17} />}
        onPress={handleSkipBack}
        size="sm"
      />
      <FlatIconButton
        isDisabled={recoilPlaylist.length === 0}
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
        isDisabled={
          recoilPlaylist.length === 0 ||
          currTrackIdx === recoilPlaylist.length - 1
        }
        startContent={<Icons.skipForward size={17} />}
        onPress={handleSkipForward}
        size="sm"
      />
      {!isPlayBar && (
        <TransparentRoundBtn
          startContent={<Icons.repeat size={17} />}
          size="sm"
          onPress={() => setIsRepeatOn(isRepeatOn == 1 ? 0 : 1)}
          isRepeatOn={isRepeatOn}
        />
      )}
    </Controllers>
  );
}
export default PlayerController;
