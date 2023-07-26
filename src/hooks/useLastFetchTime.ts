import { useState, useEffect } from "react";
import { supabase } from "@/lib/server/client";

function useLastFetchTime(column: string) {
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  useEffect(() => {
    fetchLastFetchTimeFromSupabase();
  }, []);

  const fetchLastFetchTimeFromSupabase = async () => {
    const { data, error } = await supabase
      .from("lastFetchTimes")
      .select(column)
      .order("id", { ascending: false })
      .limit(1);
    console.log("lastfetchtime", data);
    if (error) {
      console.error("Error fetching last fetch time from Supabase:", error);
    }
  };

  const updateLastFetchTimeToSupabase = async (time: Date) => {
    const { error } = await supabase
      .from("lastFetchTimes")
      .insert({ [column]: time.toISOString() });
    if (error) {
      console.error("Error updating last fetch time in Supabase:", error);
    } else {
      console.log("time", time);
      setLastFetchTime(time);
    }
  };

  return {
    lastFetchTime,
    setLastFetchTime: updateLastFetchTimeToSupabase,
  };
}

export default useLastFetchTime;
