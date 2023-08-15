"use client";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
import LikeButton from "@/components/Btns/LikeButton";
import GradientHeader from "@/components/GradientHeader";
import Hashtags from "@/components/Hashtags";
import LoadingSpinner from "@/components/LoadingSpinner";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { Track } from "@/lib/server/database.types";
import { cleanedStr, truncateString } from "@/lib/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistInfoHeader,
  ArtistName,
  ArtistNameArea,
  Desc,
} from "@/styles/Artist/Artist";
import { LastFmArtistInfo } from "@/types/trackTypes";
import { useState } from "react";

interface ArtistProps {
  artistData: LastFmArtistInfo;
  artistImgUrl: string;
  artistTopTracks: Track[];
}

function Artist({ artistData, artistImgUrl, artistTopTracks }: ArtistProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const cleanedArtistBio = cleanedStr(artistData.artist.bio?.summary);

  const similarArtistDataWithType = {
    type: "artist",
    items: artistData.artist.similar.artist,
  };

  if (!artistData) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <GradientHeader imageUrl={artistImgUrl} name={artistData.artist.name} />
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
        <ArtistTopTracks tracks={artistTopTracks} />
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
