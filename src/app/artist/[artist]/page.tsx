"use client";

import ArtistHeader from "@/components/Artist/ArtistHeader";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
import LikeButton from "@/components/Btns/LikeButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useArtistData } from "@/hooks/useArtistData";
import { useArtistImage } from "@/hooks/useArtistImage";
import { truncateString } from "@/lib/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistInfoHeader,
  ArtistName,
  Desc,
} from "@/styles/Artist/Artist";
import { useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const artistData = useArtistData(params.artist);
  const artistImageUrl = useArtistImage(params.artist);
  const [liked, setLiked] = useState<boolean>(false);

  if (!artistData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ArtistHeader imageUrl={artistImageUrl} name={artistData.artist.name} />
      <ArtistInfo>
        <ArtistInfoHeader>
          <ArtistName>{artistData.artist.name}</ArtistName>
          <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
        </ArtistInfoHeader>

        <ArtistDesc>
          <Desc>{truncateString(artistData.artist.bio?.summary, 200)}</Desc>
        </ArtistDesc>
        <ArtistTopTracks artist={params.artist} />
        {/* <ArtistAlbums /> */}
        {/* <SimilarArtists> */}
      </ArtistInfo>
    </>
  );
}

export default Artist;
