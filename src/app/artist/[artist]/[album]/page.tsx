import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { fetchAlbumInfo } from "@/app/api/lastFm/service";
import Album from "@/components/Album/Album";

async function AlbumPage({
  params,
}: {
  params: { artist: string; album: string };
}) {
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);

  const albumTracks = await fetchCherryMusicTracks({
    query: "albumtracks",
    artist: params.artist,
    album: params.album,
  });

  const albumInfo = await fetchAlbumInfo({
    artist: params.artist,
    album: params.album,
  });

  return (
    <Album
      albumInfo={albumInfo}
      albumTracks={albumTracks}
      albumTitle={decodedAlbum}
      artist={decodedArtist}
    />
  );
}

export default AlbumPage;
