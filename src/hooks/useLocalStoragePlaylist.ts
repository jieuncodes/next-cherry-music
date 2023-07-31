import { useRecoilState } from "recoil";
import { localStoragePlaylist } from "@/atoms";
import { Track } from "@/lib/server/database.types";
import useSyncedLocalStorage from "./useSyncedLocalStorage";

function useLocalStoragePlaylist() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);

  const { setValue: setPlaylist } = useSyncedLocalStorage<Track[]>({
    key: "playlist",
    initialValue: [],
    setRecoilState: setRecoilPlaylist,
  });

  const addToTopOfCurrPlaylist = (track: Track) => {
    setPlaylist((prevPlaylist: Track[]) => [track, ...prevPlaylist]);
  };
  const addToBottomOfCurrPlaylist = (track: Track) => {
    setPlaylist((prevPlaylist: Track[]) => [...prevPlaylist, track]);
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
    addToTopOfCurrPlaylist,
    addToBottomOfCurrPlaylist,
    removeFromPlaylist,
    emptyPlaylist,
  };
}

export default useLocalStoragePlaylist;
