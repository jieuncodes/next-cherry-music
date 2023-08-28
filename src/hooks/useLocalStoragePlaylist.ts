import { useRecoilState, useSetRecoilState } from "recoil";
import { currPlaylistTrackIdx, localStoragePlaylist } from "@/atoms";
import useSyncedLocalStorage from "./useSyncedLocalStorage";
import { Track } from "@/lib/server/database.types";

function useLocalStoragePlaylist() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const setCurrPlaylistTrackIdx = useSetRecoilState(currPlaylistTrackIdx);

  const { setValue: setPlaylist } = useSyncedLocalStorage<Track[]>({
    key: "playlist",
    initialValue: [],
    setRecoilState: setRecoilPlaylist,
  });

  const addToTopOfCurrPlaylist = (track: Track) => {
    setPlaylist((prevPlaylist: Track[]) => [track, ...prevPlaylist]);
    setCurrPlaylistTrackIdx(0);
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

  const addTrackListToTopOfCurrPlaylist = (trackList: Track[]) => {
    setPlaylist((prevPlaylist: Track[]) => [...trackList, ...prevPlaylist]);
    setCurrPlaylistTrackIdx(0);
  };
  return {
    playlist: recoilPlaylist,
    addToTopOfCurrPlaylist,
    addToBottomOfCurrPlaylist,
    removeFromPlaylist,
    emptyPlaylist,
    addTrackListToTopOfCurrPlaylist,
  };
}

export default useLocalStoragePlaylist;
