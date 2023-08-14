import Carousel from "@/components/Carousel/Carousel";

import TopTracks from "@/components/TopTracks";

function Home() {
  return (
    <div className="grid-cols-4">
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <TopTracks title="Today Top50" trackCategory="topTracks" query="top" />
      {/* <TrendingArtists /> */}
      {/* <TopPlayLists /> */}
    </div>
  );
}
export default Home;
