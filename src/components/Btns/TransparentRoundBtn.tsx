import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface TransparentRoundBtnProps {
  startContent: ReactNode;
  onPress: () => void;
}

function TransparentRoundBtn({
  startContent,
  onPress,
}: TransparentRoundBtnProps) {
  return (
    <Button
      isIconOnly
      className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
      radius="full"
      variant="light"
      onPress={onPress}
      startContent={startContent}
    />
  );
}

export default TransparentRoundBtn;
