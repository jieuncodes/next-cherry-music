import TransparentRoundBtn from "@/components/Btns/TransparentRoundBtn";
import { Icons } from "@/components/Icons";
import FlatIconButton from "@/components/Btns/FlatIconBtn";
import { Controllers } from "@/styles/Panel/PanelPlayer";

interface PlayerControllerProps {
  currTrackIdx: number;
  setCurrTrackIdx: (newIndex: number) => void;
  playlistLength: number;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

function PlayerController({
  currTrackIdx,
  setCurrTrackIdx,
  playlistLength,
  togglePlayPause,
  isPlaying,
}: PlayerControllerProps) {
  const handleShuffle = () => {};
  const handleSkipBack = () => {
    if (currTrackIdx > 0) {
      setCurrTrackIdx(currTrackIdx - 1);
    }
  };
  const handleSkipForward = () => {
    if (currTrackIdx < playlistLength - 1) {
      setCurrTrackIdx(currTrackIdx + 1);
    }
  };
  return (
    <Controllers>
      <TransparentRoundBtn
        startContent={<Icons.shuffle size={17} />}
        onPress={handleShuffle}
        size="sm"
      />
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
      <TransparentRoundBtn
        startContent={<Icons.repeat size={17} />}
        onPress={handleShuffle}
        size="sm"
      />
    </Controllers>
  );
}
export default PlayerController;
