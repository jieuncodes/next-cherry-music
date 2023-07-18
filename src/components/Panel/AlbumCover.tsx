import { Button } from "@nextui-org/react";
import { AlbumCoverBox, AlbumCoverImg } from "../../styles/Panel/PanelPlayer";
import { Icons } from "@/components/Icons";
import { useState } from "react";

function AlbumCover() {
  const [liked, setLiked] = useState(false);

  return (
    <AlbumCoverBox>
      <AlbumCoverImg src="/images/default_album_img.png" />
      <Button
        isIconOnly
        className="absolute z-10 right-0"
        radius="full"
        variant="light"
        onPress={() => setLiked((v) => !v)}
        startContent={
          <Icons.heart size={20} fill={liked ? "currentColor" : "none"} />
        }
      />
    </AlbumCoverBox>
  );
}
export default AlbumCover;
