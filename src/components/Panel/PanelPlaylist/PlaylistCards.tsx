import { Database } from "@/lib/server/database.types";
import PlaylistCard from "./PlaylistCard";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";

interface PlaylistCardsProps {
  tracks: Database["public"]["Tables"]["tracks"]["Row"][];
}

export function PlaylistCards({ tracks }: PlaylistCardsProps) {
  if (!tracks) return null;

  return (
    <PlaylistGrid>
      {tracks.map((track, index) => (
        <PlaylistCard key={index} track={track} index={index} />
      ))}
    </PlaylistGrid>
  );
}

export default PlaylistCards;
