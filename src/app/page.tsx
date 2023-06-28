import Carousel from "@/components/Carousel";
import WeeklyTopTracks from "@/components/WeeklyTopTracks";

export default async function Home() {
  return (
    <div className="container grid-cols-4">
    <div className="carousel-container h-80 relative">
      <Carousel />
    </div>
    <WeeklyTopTracks/>
    {/* <TrendingArtists /> */}
    {/* <TopPlayLists /> */}
  </div>
  );
}
