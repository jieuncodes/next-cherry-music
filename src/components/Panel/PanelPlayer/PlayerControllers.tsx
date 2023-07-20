import TransparentRoundBtn from "@/components/Btns/TransparentRoundBtn";
import { Icons } from "@/components/Icons";
import FlatIconButton from "@/components/Btns/FlatIconBtn";
import { Controllers } from "@/styles/Panel/PanelPlayer";

function PlayerController() {
  const handleShuffle = () => {};

  return (
    <Controllers>
      <TransparentRoundBtn
        startContent={<Icons.shuffle size={17} />}
        onPress={handleShuffle}
        size="sm"
      />
      <TransparentRoundBtn
        startContent={<Icons.skipBack size={17} />}
        onPress={handleShuffle}
        size="sm"
      />
      <FlatIconButton
        startContent={<Icons.play size={18} fill="black" />}
        onClick={handleShuffle}
      />
      <TransparentRoundBtn
        startContent={<Icons.skipForward size={17} />}
        onPress={handleShuffle}
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
