import BubbleChart from "@/components/BubbleChart/BubbleChart";
import { lastFmFetcher } from "../api/lastFm/fetcher";
import TopTracks from "@/components/TopTracks";
import { fetchCherryMusicTracks } from "../api/cherryMusic/track/service";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";

async function Chart() {
  //top artists
  const topArtists = await lastFmFetcher.fetchTopArtists();
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtists.artists.artist.slice(0, 30),
  };
  //today top 50
  const todayTop50 = await fetchCherryMusicTracks({ query: "top" });

  //top tags
  const topTags = await lastFmFetcher.fetchTopTags();

  const tagTopAlbumsDataWithType = {
    type: "hashtag",
    items: topTags.tags.tag,
  };
  return (
    <>
      <div className="-pl-12 mb-12">
        <BubbleChart arr={topArtistsDataWithType} />
      </div>
      <TopTracks title="Today Top50" trackList={todayTop50} />
      {topTags && (
        <HorizontalTiles
          sectionTitle="Top Tag Albums"
          arr={tagTopAlbumsDataWithType}
          nav
          isHashtag
        />
      )}
    </>
  );
}
export default Chart;
