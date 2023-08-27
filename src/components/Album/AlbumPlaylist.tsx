"use client";
import { CherryTrack } from "@/types/itemTypes";
import AlbumPlaylistCards from "./AlbumPlaylistCards";

function AlbumPlaylist({ playlist }: { playlist: CherryTrack[] }) {
  return (
    <div className="relative top-72">
      <AlbumPlaylistCards playlist={playlist} />
    </div>
  );
}
export default AlbumPlaylist;
