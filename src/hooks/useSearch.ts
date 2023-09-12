import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { Track } from "@/lib/server/database.types";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const useSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchedData, setSearchedData] = useState<Track[]>([]);
  const searchParams = useSearchParams();
  const queryKey = searchParams.get("keyword");

  const search = async (keyword: string) => {
    try {
      setIsLoading(true);
      const searchedData = await fetchCherryMusicTracks({
        query: "searchTitle",
        keyword,
      });
      setSearchedData(searchedData);
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (queryKey) {
      search(queryKey);
    }
  }, [queryKey]);

  return { searchedData, setSearchedData, isLoading, queryKey };
};

export default useSearch;
