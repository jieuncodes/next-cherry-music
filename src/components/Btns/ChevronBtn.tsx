import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface ChevronBtnProps {
  startContent: ReactNode;
  onPress: () => void;
}

function ChevronBtn({ startContent, onPress }: ChevronBtnProps) {
  return (
    <Button
      isIconOnly
      variant="light"
      startContent={startContent}
      size="lg"
      onPress={onPress}
      radius="full"
    />
  );
}

export default ChevronBtn;
