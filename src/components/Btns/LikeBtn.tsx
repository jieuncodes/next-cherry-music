import { Icons } from "@/app/Icons";
import useLikeTrack from "@/hooks/useLike";
import { Track } from "@/lib/server/database.types";
import { Btns } from "@/styles/PlayBar";
import { User } from "@supabase/supabase-js";

function LikeBtn({ track, user }: { track: Track; user?: User | null }) {
  const { liked, toggleLike } = useLikeTrack({
    track,
    user: user ?? null,
  });
  return (
    <Icons.heart
      color="#ff5173"
      size={20}
      fill={liked ? "#ff5173" : "none"}
      className={`cursor-pointer mt-[1px]`}
      onClick={toggleLike}
    />
  );
}

export default LikeBtn;
