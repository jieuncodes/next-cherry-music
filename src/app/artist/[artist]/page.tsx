"use client";

import GradientHeader from "@/components/GradientHeader";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
import LikeButton from "@/components/Btns/LikeButton";
import Hashtags from "@/components/Hashtags";
import LoadingSpinner from "@/components/LoadingSpinner";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { useArtistData } from "@/hooks/useArtistData";
import { useArtistImage } from "@/hooks/useArtistImage";
import { cleanedStr, truncateString } from "@/lib/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistInfoHeader,
  ArtistName,
  ArtistNameArea,
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
  const cleanedArtistBio = cleanedStr(artistData.artist.bio?.summary);

  const similarArtistDataWithType = {
    type: "artist",
    items: artistData.artist.similar.artist,
  };

  return (
    <>
      <GradientHeader imageUrl={artistImageUrl} name={artistData.artist.name} />
      <ArtistInfo>
        <ArtistInfoHeader>
          <ArtistNameArea>
            <ArtistName>{artistData.artist.name}</ArtistName>
            <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
          </ArtistNameArea>

          <Hashtags tags={artistData.artist.tags.tag} />
        </ArtistInfoHeader>

        {cleanedArtistBio.length !== 1 && (
          <ArtistDesc>
            <Desc>{truncateString(cleanedArtistBio, 200)}</Desc>
          </ArtistDesc>
        )}
        <ArtistTopTracks artist={params.artist} />
        {/* <ArtistAlbums artist={params.artist} /> */}
        <HorizontalTiles
          sectionTitle="Fans might also like"
          arr={similarArtistDataWithType}
          isCircle
        />
      </ArtistInfo>
    </>
  );
}

export default Artist;
