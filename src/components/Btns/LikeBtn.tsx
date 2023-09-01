import { Icons } from "@/app/Icons";
import useLikeTrack from "@/hooks/useLike";
import { Track } from "@/lib/server/database.types";
import { Button } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";

function LikeBtn({
  track,
  user,
  isBlack,
  className,
}: {
  track: Track;
  user?: User | null;
  isBlack?: boolean;
  className?: string;
}) {
  const { liked, toggleLike } = useLikeTrack({
    track,
    user: user ?? null,
  });
  return (
    <Button
      isIconOnly
      className={className}
      radius="full"
      variant="light"
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

export default LikeBtn;
