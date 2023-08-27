import { useRecoilState, useSetRecoilState } from "recoil";
import { currPlaylistTrackIdx, localStoragePlaylist } from "@/atoms";
import useSyncedLocalStorage from "./useSyncedLocalStorage";
import { CherryTrack } from "@/types/itemTypes";

function useLocalStoragePlaylist() {
  const [recoilPlaylist, setRecoilPlaylist] =
    useRecoilState(localStoragePlaylist);
  const setCurrPlaylistTrackIdx = useSetRecoilState(currPlaylistTrackIdx);

  const { setValue: setPlaylist } = useSyncedLocalStorage<CherryTrack[]>({
    key: "playlist",
    initialValue: [],
    setRecoilState: setRecoilPlaylist,
  });

  const addToTopOfCurrPlaylist = (track: CherryTrack) => {
    setPlaylist((prevPlaylist: CherryTrack[]) => [track, ...prevPlaylist]);
    setCurrPlaylistTrackIdx(0);
  };
  const addToBottomOfCurrPlaylist = (track: CherryTrack) => {
    setPlaylist((prevPlaylist: CherryTrack[]) => [...prevPlaylist, track]);
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

  const addTrackListToTopOfCurrPlaylist = (trackList: CherryTrack[]) => {
    setPlaylist((prevPlaylist: CherryTrack[]) => [
      ...trackList,
      ...prevPlaylist,
    ]);
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
