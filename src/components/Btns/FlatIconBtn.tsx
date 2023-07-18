import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface FlatIconButtonProps {
  startContent: ReactNode;
  onClick: () => void;
}

function FlatIconButton({ startContent, onClick }: FlatIconButtonProps) {
  return (
    <Button
      isIconOnly
      radius="full"
      variant="flat"
      startContent={startContent}
      onPress={onClick}
    />
  );
}

export default FlatIconButton;
