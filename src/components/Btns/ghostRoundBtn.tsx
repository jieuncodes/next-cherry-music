import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface GhostRoundBtnProps {
  startContent: ReactNode;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
}

function GhostRoundBtn({ startContent, onPress, size }: GhostRoundBtnProps) {
  return (
    <Button
      isIconOnly
      variant="ghost"
      startContent={startContent}
      size={size}
      radius="full"
      onPress={onPress}
    />
  );
}

export default GhostRoundBtn;
