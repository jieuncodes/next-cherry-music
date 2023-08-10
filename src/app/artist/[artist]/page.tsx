"use client";

import ArtistAlbums from "@/components/Artist/ArtistAlbums";
import ArtistHeader from "@/components/Artist/ArtistHeader";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
import SimilarArtists from "@/components/Artist/SimilarArtists";
import LikeButton from "@/components/Btns/LikeButton";
import Hashtags from "@/components/Hashtags";
import LoadingSpinner from "@/components/LoadingSpinner";
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
  console.log("artistData", artistData);
  if (!artistData) {
    return <LoadingSpinner />;
  }
  const cleanedArtistBio = cleanedStr(artistData.artist.bio?.summary);
  if (cleanedArtistBio.length === 1) {
    console.log("1");
  }
  return (
    <>
      <ArtistHeader imageUrl={artistImageUrl} name={artistData.artist.name} />
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
        <ArtistAlbums artist={params.artist} />
        <SimilarArtists artists={artistData.artist.similar.artist} />
      </ArtistInfo>
    </>
  );
}

export default Artist;
