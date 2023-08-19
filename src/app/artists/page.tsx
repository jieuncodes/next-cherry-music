import { lastFmFetcher } from "../api/lastFm/fetcher";
import BubbleChart from "@/components/BubbleChart";

async function ArtistsPage() {
  const topArtists = await lastFmFetcher.fetchTopArtists();
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtists.artists.artist.slice(0, 15),
  };

  return (
    <div className="-pl-12">
      <BubbleChart arr={topArtistsDataWithType} />
    </div>
  );
}
export default ArtistsPage;
