"use client";

import ArtistHeader from "@/components/Artist/ArtistHeader";
import LikeButton from "@/components/Btns/LikeButton";
import { useArtistData } from "@/hooks/useArtistData";
import { useArtistImage } from "@/hooks/useArtistImage";
import { truncateString } from "@/lib/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistName,
  Buttons,
  Desc,
} from "@/styles/Artist";
import { Button } from "@nextui-org/react";
import { useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const artistData = useArtistData(params.artist);
  const artistImageUrl = useArtistImage(params.artist);
  const [liked, setLiked] = useState<boolean>(false);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ArtistHeader imageUrl={artistImageUrl} name={artistData.artist.name} />
      <ArtistInfo>
        <ArtistName>{artistData.artist.name}</ArtistName>
        <ArtistDesc>
          <Desc>{truncateString(artistData.artist.bio?.summary, 200)}</Desc>
        </ArtistDesc>
        <Buttons>
          <Button variant="flat">Play All</Button>
          <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
        </Buttons>
      </ArtistInfo>
    </>
  );
}

export default Artist;
