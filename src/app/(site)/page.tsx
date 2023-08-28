import Carousel from "@/components/Carousel/Carousel";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { lastFmFetcher } from "../api/lastFm/fetcher";
import { supabase } from "@/lib/server/client";
import TopTracksContainer from "@/components/TopTracksContainer";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function Home() {
  let { data: todayTop20, error } = await supabase.from("todayTop").select("*");

  if (error) {
    console.log(error);
  }
  const [topArtistsData] = await Promise.all([lastFmFetcher.fetchTopArtists()]);
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtistsData.artists.artist,
  };

  return (
    <div>
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <Suspense fallback={<div>loading$$$</div>}>
        <TopTracksContainer todayTop20={todayTop20 || []} />
      </Suspense>
      <HorizontalTiles
        sectionTitle="Top Artists"
        arr={topArtistsDataWithType}
        isCircle
        nav
      />
      {/* <TopPlayLists /> */}
    </div>
  );
}
export default Home;
