import { useRecoilState } from "recoil";
import { localStoragePlaylist } from "@/atoms";
import { Track, TrackWithIndex } from "@/lib/server/database.types";
import useSyncedLocalStorage from "./useSyncedLocalStorage";

function useLocalStoragePlaylist() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);

  const { setValue: setPlaylist } = useSyncedLocalStorage<TrackWithIndex[]>({
    key: "playlist",
    initialValue: [],
    setRecoilState: setRecoilPlaylist,
  });

  const addToPlaylist = (track: Track) => {
    setPlaylist([
      { playlistIndex: recoilPlaylist.length, ...track },
      ...recoilPlaylist,
    ]);
  };

  const removeFromPlaylist = (index: number) => {
    setPlaylist((prevPlaylist: TrackWithIndex[]) =>
      recoilPlaylist.filter((t) => t.playlistIndex !== index)
    );
  };
  const emptyPlaylist = () => {
    setPlaylist([]);
  };

  return {
    playlist: recoilPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    emptyPlaylist,
  };
}

export default useLocalStoragePlaylist;
