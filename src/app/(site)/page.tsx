import Carousel from "@/components/Carousel/Carousel";

import TopTracks from "@/components/TopTracks";

async function Home() {
  const todayTop50 = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=top`
  );
  const todayTop50Data = await todayTop50.json();
  // console.log("todayTop50", todayTop50Data);
  return (
    <div className="grid-cols-4">
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <TopTracks title="Today Top50" trackList={todayTop50Data} />
      {/* <TrendingArtists /> */}
      {/* <TopPlayLists /> */}
    </div>
  );
}
export default Home;
