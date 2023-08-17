import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import TagPage from "@/components/Hashtag/TagPage";

async function HashtagPage({ params }: { params: { hashtag: string } }) {
  const decodedHashtag = decodeURIComponent(params.hashtag);

  const tagTopAlbumsResponse = await fetch(
    `${process.env.URL}/api/lastFm/tag/get-top-tracks?tag=${params.hashtag}`
  );
  const tagTopAlbums = await tagTopAlbumsResponse.json();

  const tagTopAlbumsDataWithType = {
    type: "album",
    items: tagTopAlbums.tracks.track,
  };

  const tagTopArtistsResponse = await fetch(
    `${process.env.URL}/api/lastFm/tag/get-top-artists?tag=${params.hashtag}`
  );
  const tagTopArtists = await tagTopArtistsResponse.json();

  const firstArtistSpotifyRes = await fetch(
    `${process.env.URL}/api/spotify/artist?artist=${tagTopArtists.topartists.artist[0]}`
  );
  const spotifyArtistData = await firstArtistSpotifyRes.json();
  const firstArtistImgUrl =
    spotifyArtistData?.best_match?.items[0]?.images[0]?.url;
  const tagTopArtistsDataWithType = {
    type: "artist",
    items: tagTopArtists.topartists.artist,
  };

  const tagTopTracks = await fetchCherryMusicTracks({
    query: "tag-top",
    tag: params.hashtag,
  });

  return (
    <TagPage
      hashtag={decodedHashtag}
      tagTopAlbums={tagTopAlbumsDataWithType}
      tagTopArtists={tagTopArtistsDataWithType}
      firstArtistImgUrl={firstArtistImgUrl}
      tagTopTracks={tagTopTracks}
    />
  );
}

export default HashtagPage;
