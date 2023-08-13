import { Track } from "@/lib/server/database.types";
import AlbumPlaylistCards from "./AlbumPlaylistCards";

function AlbumPlaylist({ playlist }: { playlist: Track[] }) {
  return (
    <div className="relative top-72">
      <AlbumPlaylistCards playlist={playlist} />
    </div>
  );
}
export default AlbumPlaylist;
