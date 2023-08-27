import { currPlayingTrackYoutubeId } from "@/atoms";
import { PlaylistGrid } from "@/styles/Artist/ArtistPlaylist";
import { AlbumTrack } from "@/types/lastFmTypes";
import { useRecoilValue } from "recoil";
import ArtistPlaylistCard from "../Artist/ArtistPlaylistCard";
import { Track } from "@/lib/server/database.types";
import AlbumPlaylistCard from "./AlbumPlaylistCard";

export function AlbumPlaylistCards({ playlist }: { playlist: Track[] }) {
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);

  return (
    <div className="grid grid-cols gap-1">
      {playlist.map((track, index) => (
        <AlbumPlaylistCard
          key={index}
          track={track}
          index={index}
          isPlayingTrack={track.youtubeId === playingTrack}
        />
      ))}
    </div>
  );
}

export default AlbumPlaylistCards;
