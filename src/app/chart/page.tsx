import TopArtistsChart from "@/components/Chart/Chart";
import TopTags from "@/components/Chart/TopTags";
import TopTracksContainer from "@/components/TopTracksContainer";
import { supabase } from "@/lib/server/client";

async function ChartPage() {
  let { data: top20, error } = await supabase.from("todayTop").select("*");

  return (
    <>
      <TopArtistsChart />
      <div className="-mt-10">
        <TopTracksContainer query={"top"} top20={top20 || []} />
      </div>

      <TopTags />
    </>
  );
}
export default ChartPage;
