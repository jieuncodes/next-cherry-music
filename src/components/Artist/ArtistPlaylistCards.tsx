import { Track } from "@/lib/server/database.types";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import { useRecoilValue } from "recoil";
import { currPlayingTrackYoutubeId } from "../../atoms";
import ArtistPlaylistCard from "./ArtistPlaylistCard";

export function ArtistPlaylistCards({ playlist }: { playlist: Track[] }) {
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  console.log("", playlist);
  return (
    <PlaylistGrid>
      {playlist.map((track, index) => (
        <ArtistPlaylistCard
          key={index}
          track={track}
          index={index}
          isPlayingTrack={track.youtubeId === playingTrack}
        />
      ))}
    </PlaylistGrid>
  );
}

export default ArtistPlaylistCards;
