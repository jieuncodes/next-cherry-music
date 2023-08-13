"use client";

import { fetchAlbumInfo } from "@/app/api/lastFm/service";
import GradientHeader from "@/components/GradientHeader";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hashtags from "@/components/Hashtags";
import {
  AlbumBtns,
  AlbumContainer,
  AlbumDetail,
  AlbumDetails,
  AlbumTitle,
  HeaderAlbumInfo,
} from "@/styles/Album/album";
import { floatToTime, secsToTime } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { Icons } from "@/app/Icons";
import useDbTracks from "@/hooks/useDbTracks";
import AlbumPlaylist from "@/components/Album/AlbumPlaylist";

function Album({ params }: { params: { artist: string; album: string } }) {
  const [albumInfo, setAlbumInfo] = useState<LastFmAlbumInfo | null>(null);
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);

  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "albumTracks",
    query: "album-tracks",
    artist: params.artist,
    album: params.album,
  });

  useEffect(() => {
    const getAlbumInfo = async () => {
      const albumInfo = await fetchAlbumInfo({
        album: params.album,
        artist: params.artist,
      });
      setAlbumInfo(albumInfo);
    };
    getAlbumInfo();
    console.log("reqTracks", reqTracks);
  }, []);

  const allTrackTimesSum = albumInfo?.tracks.track.reduce(
    (acc, curr) => acc + Number(curr.duration),
    0
  );
  return (
    <AlbumContainer>
      <GradientHeader
        imageUrl={
          albumInfo?.image[3]["#text"] || "/images/default_album_cover.webp"
        }
        name={decodedAlbum}
      />
      {albumInfo?.tags.tag && <Hashtags tags={albumInfo?.tags.tag} />}
      <HeaderAlbumInfo>
        <Image
          src={
            albumInfo?.image[3]["#text"] || "/images/default_album_cover.webp"
          }
          alt={decodedAlbum}
          width={200}
          height={200}
          className="rounded-md"
        />
        <AlbumDetails>
          <AlbumTitle>{decodedAlbum}</AlbumTitle>
          <AlbumDetail>
            {decodedArtist} •{" "}
            {albumInfo?.wiki.published.split(" ")[2].replace(",", "")}
          </AlbumDetail>
          <AlbumDetail>
            {albumInfo?.tracks.track.length} Tracks •{" "}
            {secsToTime(allTrackTimesSum || 0)}
          </AlbumDetail>
          <AlbumBtns>
            <Button
              radius="full"
              variant="flat"
              startContent={<Icons.play size={20} fill="black" />}
              onPress={() => console.log("play")}
            >
              Play
            </Button>
            <Button
              radius="full"
              variant="ghost"
              startContent={<Icons.copyPlus size={20} />}
              onPress={() => console.log("add to playlist")}
            >
              Add to playlist
            </Button>
          </AlbumBtns>
        </AlbumDetails>
      </HeaderAlbumInfo>
      {!isSaved && isLoading ? <></> : <AlbumPlaylist playlist={reqTracks} />}
    </AlbumContainer>
  );
}

export default Album;
