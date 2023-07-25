import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";

interface ITrackFetcher {
  fetchTracks: () => Promise<Track[]>;
}

export class LastFmFetcher implements ITrackFetcher {
  async fetchTracks(): Promise<Track[]> {
    const response = await fetch("/api/lastFm/fetch-tracks");
    const data = await response.json();
    return data.allTrackInfo;
  }
}

export class SupabaseFetcher implements ITrackFetcher {
  async fetchTracks(): Promise<Track[]> {
    const response = await fetch("/api/supabase/get-from-db");
    return response.json();
  }
}

function useTrackFetcher(fetcher: ITrackFetcher) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetcher.fetchTracks().then(setTopTracks);
  }, []);

  return { topTracks };
}

export default useTrackFetcher;
