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
  albumInfo: LastFmAlbumInfo;
  albumTracks: Track[];
  albumTitle: string;
  artist: string;
}
function Album({ albumInfo, albumTracks, albumTitle, artist }: AlbumProps) {
  console.log("albumInfoalbumInfoalbumInfoalbumInfoalbumInfo", albumInfo);

  return (
    <AlbumContainer>
      <GradientHeader
        imageUrl={
          albumInfo?.image[3]["#text"] || "/images/default_album_cover.webp"
        }
        name={albumTitle}
      />
      {albumInfo?.tags?.tag && <Hashtags tags={albumInfo?.tags.tag} />}
      <HeaderAlbumInfo>
        <Image
          src={
            albumInfo.image[3]["#text"] || "/images/default_album_cover.webp"
          }
          alt={albumTitle}
          width={200}
          height={200}
          className="rounded-md"
        />
        <AlbumDetails
          albumTitle={albumTitle}
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
