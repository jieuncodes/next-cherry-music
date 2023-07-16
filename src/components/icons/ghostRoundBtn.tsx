import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface GhostRoundBtnProps {
  startContent: ReactNode;
  onPress: () => void;
}

function GhostRoundBtn({ startContent, onPress }: GhostRoundBtnProps) {
  return (
    <Button
      isIconOnly
      variant="ghost"
      startContent={startContent}
      size="xs"
      radius="full"
      onPress={onPress}
    />
  );
}

export default GhostRoundBtn;
