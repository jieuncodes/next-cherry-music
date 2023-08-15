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
    `/api/lastFm/tag/get-top-artists?tag=${params.hashtag}`
  );
  const tagTopArtists = await tagTopArtistsResponse.json();

  const spotifyArtistResponse = await fetch(
    `/api/spotify/artist?artist=${tagTopArtists.tracks.track[0]}`
  );
  const spotifyArtistData = await spotifyArtistResponse.json();
  const firstArtistImgUrl = spotifyArtistData?.images[0]?.url;
  const tagTopArtistsDataWithType = {
    type: "artist",
    items: tagTopArtists.tracks.track,
  };

  const tagTopTracksResponse = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=tag-top&tag=${params.hashtag}`
  );
  const tagTopTracks = await tagTopTracksResponse.json();

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
