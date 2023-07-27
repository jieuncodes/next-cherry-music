import Carousel from "@/components/Carousel/Carousel";

import PlayBar from "@/components/PlayBar";
import WeeklyTopTracks from "@/components/WeeklyTopTracks";

export default async function Home() {
  return (
    <div className="grid-cols-4">
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <WeeklyTopTracks />
      {/* <TrendingArtists /> */}
      {/* <TopPlayLists /> */}
    </div>
  );
}
