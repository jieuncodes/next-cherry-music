import { currPlayingTrackYoutubeId } from "@/atoms";
import { PlaylistGrid } from "@/styles/Artist/ArtistPlaylist";
import { AlbumTrack } from "@/types/lastFmTypes";
import { useRecoilValue } from "recoil";
import ArtistPlaylistCard from "../Artist/ArtistPlaylistCard";
import AlbumPlaylistCard from "./AlbumPlaylistCard";
import { CherryTrack } from "@/types/itemTypes";

export function AlbumPlaylistCards({ playlist }: { playlist: CherryTrack[] }) {
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
