import { Database } from "@/lib/server/database.types";
import useLocalStorage from "./useLocalStorage";

type Track = Database["public"]["Tables"]["tracks"]["Row"];

function useLocalStoragePlaylist() {
  const [playlist, setPlaylist] = useLocalStorage<Track[]>("playlist", []);

  const addToPlaylist = (track: Track) => {
    console.log("add to pl");
    setPlaylist((currentPlaylist) => [...currentPlaylist, track]);
  };

  const removeFromPlaylist = (trackId: number) => {
    setPlaylist((currentPlaylist) =>
      currentPlaylist.filter((t) => t.id !== trackId)
    );
  };

  return { playlist, addToPlaylist, removeFromPlaylist };
}

export default useLocalStoragePlaylist;
