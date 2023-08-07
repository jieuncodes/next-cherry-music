import { useState, useEffect } from "react";
import { supabase } from "@/lib/server/client";
import { handleError } from "@/lib/helpers";

function useLastFetchTime(column: string) {
  const [isLastFetchStateLoading, setIsLastFetchStateLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  useEffect(() => {
    fetchLastFetchTimeFromSupabase();
  }, []);

  const fetchLastFetchTimeFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("lastFetchTimes")
        .select(column)
        .order("id", { ascending: false })
        .limit(1);
      if (error) {
        console.log("Error fetching last fetch time from SB.", error);
      }
      if (data && data[0]) {
        console.log("setLastFetchTime");
        setLastFetchTime(new Date(data[0][column as any]));
      }
    } catch (error) {
      handleError({
        context: "fetchLastFetchTimeFromSupabase has an error.",
        error,
      });
    } finally {
      setIsLastFetchStateLoading(false);
    }
  };

  const updateLastFetchTimeToSupabase = async (time: Date) => {
    const { error } = await supabase
      .from("lastFetchTimes")
      .insert({ [column]: time.toISOString() });
    if (error) {
      console.error("Error updating last fetch time in Supabase:", error);
    } else {
      setLastFetchTime(time);
    }
  };

  return {
    lastFetchTime,
    setLastFetchTime: updateLastFetchTimeToSupabase,
    isLastFetchStateLoading,
  };
}

export default useLastFetchTime;
