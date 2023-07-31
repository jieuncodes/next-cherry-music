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
    console.log("playlist", recoilPlaylist);
    setPlaylist([
      { playlistIndex: recoilPlaylist.length, ...track },
      ...recoilPlaylist,
    ]);
  };

  const removeFromPlaylist = (index: number) => {
    const newPlaylist = [
      ...recoilPlaylist.slice(0, index),
      ...recoilPlaylist.slice(index + 1),
    ];
    setPlaylist(newPlaylist);
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
