"use client";
import { Icons } from "@/app/Icons";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { Track } from "@/lib/server/database.types";
import { secsToTime } from "@/lib/utils";
import {
  AlbumBtns,
  AlbumDetail,
  AlbumDetailsContainer,
  AlbumTitle,
} from "@/styles/Album/album";
import { LastFmAlbumInfo } from "@/types/trackTypes";
import { Button } from "@nextui-org/react";

interface AlbumDetailsProps {
  albumTitle: string;
  artist: string;
  albumInfo?: LastFmAlbumInfo;
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

  const allTrackTimesSum = tracksArray?.reduce(
    (acc, curr) => acc + (curr ? Number(curr.duration) : 0),
    0
  );

  return (
    <AlbumDetailsContainer>
      <AlbumTitle>{albumTitle}</AlbumTitle>
      <AlbumDetail>
        {artist}{" "}
        {albumInfo &&
          "•" + albumInfo.wiki?.published.split(" ")[2].replace(",", "")}
      </AlbumDetail>
      <AlbumDetail>
        {albumInfo?.tracks?.track?.length
          ? albumInfo.tracks.track.length + " Tracks"
          : "1 Track"}{" "}
        • {(albumInfo && secsToTime(allTrackTimesSum || 0)) || "02:09"}
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
