import { useRecoilState } from "recoil";
import { currPlaylistTrackIdx } from "@/atoms";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import PlaylistCard from "./PlaylistCard";
import { CherryTrack } from "@/types/itemTypes";
import { Track } from "@/lib/server/database.types";

export function PlaylistCards({ playlist }: { playlist: Track[] }) {
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currPlaylistTrackIdx);
  return (
    <PlaylistGrid>
      {playlist.map((track, index) => (
        <PlaylistCard
          key={index}
          track={track}
          index={index}
          isPlayingTrack={index === currTrackIdx}
        />
      ))}
    </PlaylistGrid>
  );
}

export default PlaylistCards;
