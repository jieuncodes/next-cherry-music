"use client";

import AlbumDetails from "@/components/Album/AlbumDetails";
import AlbumPlaylist from "@/components/Album/AlbumPlaylist";
import GradientHeader from "@/components/GradientHeader";
import Hashtags from "@/components/Hashtags";
import { Track } from "@/lib/server/database.types";
import { AlbumContainer, HeaderAlbumInfo } from "@/styles/Album/album";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import Image from "next/image";

interface AlbumProps {
  albumInfo?: LastFmAlbumInfo;
  albumTracks: Track[];
  albumTitle: string;
  artist: string;
  isSingleAbum?: boolean;
}
function Album({
  albumInfo,
  albumTracks,
  albumTitle,
  artist,
  isSingleAbum,
}: AlbumProps) {
  const determineImageUrl = () => {
    if (isSingleAbum) {
      return albumTracks[0].albumImgUrl || "/images/default_album_cover.webp";
    }
    return albumInfo?.image[3]["#text"] || "/images/default_album_cover.webp";
  };

  return (
    <AlbumContainer>
      <GradientHeader imageUrl={determineImageUrl()} name={albumTitle} />
      {albumInfo?.tags?.tag && <Hashtags tags={albumInfo?.tags.tag} />}
      <HeaderAlbumInfo>
        <Image
          src={determineImageUrl()}
          alt={albumTitle}
          width={200}
          height={200}
          className="rounded-md"
        />
        <AlbumDetails
          albumTitle={isSingleAbum ? "Single Album" : albumTitle}
          artist={artist}
          albumInfo={albumInfo}
          albumTracks={albumTracks}
        />
      </HeaderAlbumInfo>
      {<AlbumPlaylist playlist={albumTracks} />}
    </AlbumContainer>
  );
}
export default Album;
