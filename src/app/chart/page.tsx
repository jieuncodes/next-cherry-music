import TopArtistsChart from "@/components/Chart/Chart";
import TopTags from "@/components/Chart/TopTags";
import TopTracksContainer from "@/components/TopTracksContainer";
import { supabase } from "@/lib/server/client";

async function ChartPage() {
  let { data: todayTop20, error } = await supabase.from("todayTop").select("*");

  return (
    <>
      <TopArtistsChart />
      <TopTracksContainer todayTop20={todayTop20 || []} />
      <TopTags />
    </>
  );
}
export default ChartPage;
