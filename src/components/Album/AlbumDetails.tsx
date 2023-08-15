"use client";
import {
  AlbumBtns,
  AlbumDetail,
  AlbumDetailsContainer,
  AlbumTitle,
} from "@/styles/Album/album";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import { Button } from "@nextui-org/react";
import { secsToTime } from "@/lib/utils";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { Icons } from "@/app/Icons";
import { Track } from "@/lib/server/database.types";

interface AlbumDetailsProps {
  albumTitle: string;
  artist: string;
  albumInfo: LastFmAlbumInfo;
  albumTracks: Track[];
}

function AlbumDetails({
  albumTitle,
  artist,
  albumInfo,
  albumTracks,
}: AlbumDetailsProps) {
  const { addTrackListToTopOfCurrPlaylist } = useLocalStoragePlaylist();

  const tracksArray = Array.isArray(albumInfo?.tracks?.track)
    ? albumInfo?.tracks?.track
    : [albumInfo?.tracks?.track];

  const allTrackTimesSum = tracksArray.reduce(
    (acc, curr) => acc + Number(curr.duration),
    0
  );

  return (
    <AlbumDetailsContainer>
      <AlbumTitle>{albumTitle}</AlbumTitle>
      <AlbumDetail>
        {artist} • {albumInfo?.wiki?.published.split(" ")[2].replace(",", "")}
      </AlbumDetail>
      <AlbumDetail>
        {albumInfo?.tracks?.track.length} Tracks •{" "}
        {secsToTime(allTrackTimesSum || 0)}
      </AlbumDetail>
      <AlbumBtns>
        <Button
          radius="full"
          variant="flat"
          startContent={<Icons.play size={20} fill="black" />}
          onPress={() => addTrackListToTopOfCurrPlaylist(albumTracks)}
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
    </AlbumDetailsContainer>
  );
}

export default AlbumDetails;
