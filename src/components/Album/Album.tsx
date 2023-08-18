"use client";

import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import AlbumDetails from "@/components/Album/AlbumDetails";
import AlbumPlaylist from "@/components/Album/AlbumPlaylist";
import GradientHeader from "@/components/GradientHeader";
import Hashtags from "@/components/Hashtags";
import { Track } from "@/lib/server/database.types";
import { AlbumContainer, HeaderAlbumInfo } from "@/styles/Album/album";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import AlbumPlaylistSkeleton from "./AlbumPlaylistSkeleton";
import { lastFmFetcher } from "../../app/api/lastFm/fetcher";

interface AlbumProps {
  singleTrack?: Track[];
  albumTitle: string;
  artist: string;
  isSingleAlbum?: boolean;
}
function Album({ albumTitle, artist, isSingleAlbum, singleTrack }: AlbumProps) {
  const [albumTracks, setAlbumTracks] = useState<Track[] | null>(null);
  const [albumInfo, setAlbumInfo] = useState<LastFmAlbumInfo | null>(null);
  useEffect(() => {
    if (!isSingleAlbum) {
      const fetchAlbumTracks = async () => {
        const data = await fetchCherryMusicTracks({
          query: "albumtracks",
          artist,
          album: albumTitle,
        });
        setAlbumTracks(data);
      };
      const fetchAlbumInfoData = async () => {
        const data = await lastFmFetcher.fetchAlbumInfo({
          artist,
          album: albumTitle,
        });
        setAlbumInfo(data);
      };

      fetchAlbumTracks();
      fetchAlbumInfoData();
    } else if (singleTrack) {
      setAlbumTracks(singleTrack);
    }
  }, [artist]);

  const determineImageUrl = () => {
    if (isSingleAlbum && singleTrack) {
      return singleTrack[0].albumImgUrl || "/images/default_album_cover.webp";
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
        {albumTracks && (
          <AlbumDetails
            albumTitle={albumTitle}
            artist={artist}
            albumInfo={albumInfo}
            albumTracks={albumTracks}
          />
        )}
      </HeaderAlbumInfo>
      {albumTracks ? (
        <AlbumPlaylist playlist={albumTracks} />
      ) : (
        <AlbumPlaylistSkeleton />
      )}
    </AlbumContainer>
  );
}
export default Album;
