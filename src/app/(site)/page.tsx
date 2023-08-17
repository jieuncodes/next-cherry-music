import Carousel from "@/components/Carousel/Carousel";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";

import TopTracks from "@/components/TopTracks";
import { fetchTopArtists } from "../api/lastFm/service";

async function Home() {
  const todayTop50 = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=top`
  );
  const todayTop50Data = await todayTop50.json();

  const topArtistsData = await fetchTopArtists();
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtistsData.artists.artist,
  };
  return (
    <div className="grid-cols-4">
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <TopTracks title="Today Top50" trackList={todayTop50Data} />

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
