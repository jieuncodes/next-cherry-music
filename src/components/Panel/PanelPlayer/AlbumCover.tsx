import LikeTrackBtn from "@/components/Btns/LikeTrackBtn";
import { Track } from "@/lib/server/database.types";
import { useUser } from "@supabase/auth-helpers-react";
import {
  AlbumCoverBox,
  AlbumCoverImg,
} from "../../../styles/Panel/PanelPlayer";

function AlbumCover({ track }: { track: Track }) {
  const user = useUser();
  return (
    <AlbumCoverBox>
      <AlbumCoverImg
        src={track.albumImgUrl || "/images/default_album_img.png"}
      />
      <LikeTrackBtn
        track={track}
        user={user}
        className="absolute z-10 right-0"
      />
    </AlbumCoverBox>
  );
}
export default AlbumCover;
