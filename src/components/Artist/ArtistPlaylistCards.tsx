import { useRecoilValue } from "recoil";
import { currPlaylistTrackIdx } from "@/atoms";
import { Track } from "@/lib/server/database.types";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import ArtistPlaylistCard from "./ArtistPlaylistCard";

export function ArtistPlaylistCards({ playlist }: { playlist: Track[] }) {
  console.log("playlist", playlist);
  const currTrackIdx = useRecoilValue(currPlaylistTrackIdx);
  return (
    <PlaylistGrid>
      {playlist.map((track, index) => (
        <ArtistPlaylistCard
          key={index}
          track={track}
          index={index}
          isPlayingTrack={index === currTrackIdx}
        />
      ))}
    </PlaylistGrid>
  );
}

export default ArtistPlaylistCards;
