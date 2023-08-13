"use client";

import { Icons } from "@/app/Icons";
import AlbumPlaylist from "@/components/Album/AlbumPlaylist";
import GradientHeader from "@/components/GradientHeader";
import Hashtags from "@/components/Hashtags";
import useDbTracks from "@/hooks/useDbTracks";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { secsToTime } from "@/lib/utils";
import {
  AlbumBtns,
  AlbumContainer,
  AlbumDetail,
  AlbumDetails,
  AlbumTitle,
  HeaderAlbumInfo,
} from "@/styles/Album/album";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Album({ params }: { params: { artist: string; album: string } }) {
  const [albumInfo, setAlbumInfo] = useState<LastFmAlbumInfo | null>(null);
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);
  const { addTrackListToTopOfCurrPlaylist } = useLocalStoragePlaylist();
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "albumTracks",
    query: "album-tracks",
    artist: params.artist,
    album: params.album,
  });

  useEffect(() => {
    const getAlbumInfo = async () => {
      const response = await fetch(
        `/api/lastFm/album/get-info?artist=${params.artist}&album=${params.album}`
      );
      const albumInfo = await response.json();
      setAlbumInfo(albumInfo.album);
    };
    getAlbumInfo();
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
              onPress={() => addTrackListToTopOfCurrPlaylist(reqTracks)}
            >
              Play
            </Button>
            {/* TODO: make playlist list modal so user can add to specific playlist */}
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
