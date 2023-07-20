import { Button } from "@nextui-org/react";
import {
  AlbumCoverBox,
  AlbumCoverImg,
} from "../../../styles/Panel/PanelPlayer";
import { Icons } from "@/components/Icons";
import { useState } from "react";

function AlbumCover({ albumCoverURL }: { albumCoverURL: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <AlbumCoverBox>
      <AlbumCoverImg src={albumCoverURL || "/images/default_album_img.png"} />
      <Button
        isIconOnly
        className="absolute z-10 right-0"
        radius="full"
        variant="light"
        onPress={() => setLiked((v) => !v)}
        startContent={
          albumCoverURL && (
            <Icons.heart
              color="#ff5173"
              size={20}
              fill={liked ? "#ff5173" : "none"}
            />
          )
        }
      />
    </AlbumCoverBox>
  );
}
export default AlbumCover;
