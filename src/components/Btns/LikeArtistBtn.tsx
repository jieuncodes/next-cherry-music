import { Icons } from "@/app/Icons";
import useLikeArtist from "@/hooks/useLikeArtist";
import { Button } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";

function LikeArtistBtn({
  user,
  isBlack,
  isFlat,
  className,
  artistName,
  isDisabled,
}: {
  user: User | null;
  isBlack?: boolean;
  isFlat?: boolean;
  className?: string;
  artistName: string | undefined;
  isDisabled?: boolean;
}) {
  const { liked, toggleLike } = useLikeArtist({
    user: user ?? null,
    artistName: artistName ?? null,
  });
  return (
    <Button
      isDisabled={isDisabled}
      isIconOnly
      className={className}
      radius="full"
      variant={isFlat ? "flat" : "light"}
      onPress={toggleLike}
      startContent={
        <Icons.heart
          color={isBlack ? "#000000" : "#ff5173"}
          size={20}
          fill={liked ? (isBlack ? "#000000" : "#ff5173") : "none"}
        />
      }
    />
  );
}

export default LikeArtistBtn;
