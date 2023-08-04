import { Icons } from "@/app/Icons";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface LikeButtonProps {
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
  iconColor: string;
}

function LikeButton({ liked, setLiked, iconColor }: LikeButtonProps) {
  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      onPress={() => setLiked(!liked)}
      startContent={
        <Icons.heart color={iconColor} fill={liked ? iconColor : "none"} />
      }
    />
  );
}
export default LikeButton;
