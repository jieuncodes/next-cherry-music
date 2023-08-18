import { fetchSpotifyArtist } from "@/app/api/spotify/service";
import TagPage from "@/components/Hashtag/TagPage";
import { lastFmFetcher } from "../../api/lastFm/fetcher";

async function HashtagPage({ params }: { params: { hashtag: string } }) {
  const decodedHashtag = decodeURIComponent(params.hashtag);

  const tagTopArtists = await lastFmFetcher.fetchTagTopArtists(params.hashtag);

  const spotifyFirstArtistData = await fetchSpotifyArtist(
    tagTopArtists.topartists.artist[0]
  );
  const firstArtistImgUrl =
    spotifyFirstArtistData?.best_match?.items[0]?.images[0]?.url;

  return (
    <TagPage hashtag={decodedHashtag} firstArtistImgUrl={firstArtistImgUrl} />
  );
}

export default HashtagPage;
