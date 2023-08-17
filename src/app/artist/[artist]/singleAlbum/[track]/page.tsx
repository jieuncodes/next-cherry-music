import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import Album from "@/components/Album/Album";

async function SingleAlbumPage({
  params,
}: {
  params: { artist: string; track: string };
}) {
  const decodedTrack = decodeURIComponent(params.track);
  const decodedArtist = decodeURIComponent(params.artist);

  const trackInfo = await fetchCherryMusicTracks({
    query: "track",
    artist: params.artist,
    trackTitle: params.track,
  });

  return (
    <Album
      albumTracks={trackInfo}
      albumTitle={`${decodedTrack}- Single Album`}
      artist={decodedArtist}
      isSingleAbum={true}
    />
  );
}

export default SingleAlbumPage;
