import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface TransparentRoundBtnProps {
  startContent: ReactNode;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
}

function TransparentRoundBtn({
  startContent,
  onPress,
  size,
}: TransparentRoundBtnProps) {
  return (
    <Button
      isIconOnly
      className=" data-[hover]:bg-foreground/10 "
      radius="full"
      variant="light"
      onPress={onPress}
      startContent={startContent}
      size={size}
    />
  );
}

export default TransparentRoundBtn;
