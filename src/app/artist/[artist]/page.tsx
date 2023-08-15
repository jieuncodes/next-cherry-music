import Artist from "@/components/Artist/Artist";
import { LastFmArtistInfo } from "@/types/trackTypes";

async function ArtistPage({ params }: { params: { artist: string } }) {
  const artistDataResponse = await fetch(
    `${process.env.URL}/api/lastFm/artist?artist=${params.artist}`
  );
  const artistData: LastFmArtistInfo = await artistDataResponse.json();

  const spotifyArtistResponse = await fetch(
    `${process.env.URL}/api/spotify/artist?artist=${params.artist}`
  );
  const spotifyArtistData = await spotifyArtistResponse.json();
  const artistImgUrl =
    spotifyArtistData.best_match?.items[0]?.images[0]?.url ||
    "/images/default_album_cover.webp";
  console.log("spotifyArtistData", spotifyArtistData);
  const artistTopTracksResponse = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=artist-top&artist=${params.artist}`
  );
  const artistTopTracks = await artistTopTracksResponse.json();

  return (
    <Artist
      artistData={artistData}
      artistImgUrl={artistImgUrl}
      artistTopTracks={artistTopTracks}
    />
  );
}

export default ArtistPage;
