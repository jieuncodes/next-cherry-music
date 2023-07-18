import React from "react";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Progress,
  CardBody,
} from "@nextui-org/react";
import { Icons } from "../Icons";
import FlatIconButton from "../Btns/FlatIconBtn";
import GhostRoundBtn from "../Btns/ghostRoundBtn";
import {
  AlbumCover,
  AlbumCoverBox,
  Controllers,
  PanelPlayerContainer,
  PanelPlayerContents,
} from "@/styles/Panel/PanelPlayer";

function PanelPlayer() {
  const [liked, setLiked] = React.useState(false);

  return (
    <PanelPlayerContainer>
      <AlbumCoverBox>
        <AlbumCover src="/images/default_album_img.png" />
      </AlbumCoverBox>
      <Controllers></Controllers>
    </PanelPlayerContainer>
  );
}

export default PanelPlayer;
