"use client";
import AlbumPlaylistCards from "./AlbumPlaylistCards";
import { Track } from "@/lib/server/database.types";

function AlbumPlaylist({ playlist }: { playlist: Track[] }) {
  return (
    <div className="relative top-72">
      <AlbumPlaylistCards playlist={playlist} />
    </div>
  );
}
export default AlbumPlaylist;
