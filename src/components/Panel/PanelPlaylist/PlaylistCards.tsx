import PlaylistCard from "./PlaylistCard";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import useLocalStoragePlaylist from "@/hooks/useLocalStoragePlaylist";
import { useRecoilState } from "recoil";
import { currTrackIdxAtom } from "@/atoms";

export function PlaylistCards() {
  const { playlist, addToPlaylist, removeFromPlaylist } =
    useLocalStoragePlaylist();
  const [currTrackIdx, setCurrTrackIdx] = useRecoilState(currTrackIdxAtom);

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
