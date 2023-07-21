import PlaylistCard from "./PlaylistCard";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";

export function PlaylistCards() {
  const { playlist, addToPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();

  return (
    <PlaylistGrid>
      {playlist.map((track, index) => (
        <PlaylistCard key={index} track={track} index={index} />
      ))}
    </PlaylistGrid>
  );
}

export default PlaylistCards;
