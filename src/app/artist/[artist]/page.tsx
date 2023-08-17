import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { fetchArtistInfo } from "@/app/api/lastFm/service";
import { fetchSpotifyArtist } from "@/app/api/spotify/service";
import Artist from "@/components/Artist/Artist";

async function ArtistPage({ params }: { params: { artist: string } }) {
  const spotifyArtist = await fetchSpotifyArtist(params.artist);
  const artistImgUrl =
    spotifyArtist.best_match?.items[0]?.images[0]?.url ||
    "/images/default_album_cover.webp";

  return <Artist artist={params.artist} artistImgUrl={artistImgUrl} />;
}

export default ArtistPage;
