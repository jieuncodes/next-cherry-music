import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface FlatIconButtonProps {
  startContent: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}

function FlatIconButton({
  startContent,
  onClick,
  isDisabled,
}: FlatIconButtonProps) {
  return (
    <Button
      isDisabled={isDisabled}
      isIconOnly
      radius="full"
      variant="flat"
      startContent={startContent}
      onPress={isDisabled ? undefined : onClick}
    />
  );
}

export default FlatIconButton;
