import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface GhostRoundBtnProps {
  startContent: ReactNode;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
}

function GhostRoundBtn({
  startContent,
  onPress,
  size,
  isDisabled,
}: GhostRoundBtnProps) {
  return (
    <Button
      isDisabled={isDisabled}
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
