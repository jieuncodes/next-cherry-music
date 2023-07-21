import { useRecoilState } from "recoil";
import useLocalStorage from "./useLocalStorage";
import { localStoragePlaylist } from "@/atoms";
import { Track } from "@/lib/server/database.types";

function useLocalStoragePlaylist() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);

  const [playlist, setPlaylist] = useLocalStorage<Track[]>({
    key: "playlist",
    initialValue: [],
    setRecoilState: setRecoilPlaylist,
  });

  const addToPlaylist = (track: Track) => {
    setPlaylist((currentPlaylist) => [track, ...currentPlaylist]);
  };

  const removeFromPlaylist = (trackId: number) => {
    setPlaylist((currentPlaylist) =>
      currentPlaylist.filter((t) => t.id !== trackId)
    );
  };

  return { playlist: recoilPlaylist, addToPlaylist, removeFromPlaylist };
}

export default useLocalStoragePlaylist;
