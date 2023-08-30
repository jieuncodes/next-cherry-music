import { currPlayingTrackYoutubeId } from "@/atoms";
import { useRecoilValue } from "recoil";
import AlbumPlaylistCard from "./AlbumPlaylistCard";
import { Track } from "@/lib/server/database.types";

export function AlbumPlaylistCards({ playlist }: { playlist: Track[] }) {
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  console.log("playlist", playlist);
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
