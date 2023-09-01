import Carousel from "@/components/Carousel/Carousel";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { lastFmFetcher } from "../api/lastFm/fetcher";
import { supabase } from "@/lib/server/client";
import TopTracksContainer from "@/components/TopTracksContainer";

export const dynamic = "force-dynamic";

async function Home() {
  let { data: top20, error } = await supabase.from("todayTop").select("*");

  if (error) {
    console.log(error);
  }
  const [topArtistsData] = await Promise.all([lastFmFetcher.fetchTopArtists()]);
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtistsData.artists.artist,
  };

  return (
    <>
      <div className="h-80">
        <Carousel />
      </div>
      <TopTracksContainer query={"top"} top20={top20 || []} />
      <HorizontalTiles
        sectionTitle="Top Artists"
        arr={topArtistsDataWithType}
        isCircle
        nav
      />
      {/* <TopPlayLists /> */}
    </>
  );
}
export default Home;
