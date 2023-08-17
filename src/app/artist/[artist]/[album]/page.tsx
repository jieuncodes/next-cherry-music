import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import Album from "@/components/Album/Album";

async function AlbumPage({
  params,
}: {
  params: { artist: string; album: string };
}) {
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);

  const albumTracks = await fetchCherryMusicTracks({
    query: "album-tracks",
    artist: params.artist,
    album: params.album,
  });

  const albumInfoResponse = await fetch(
    `${process.env.URL}/api/lastFm/album/get-info?artist=${params.artist}&album=${params.album}`
  );
  const albumInfo = await albumInfoResponse.json();

  return (
    <Album
      albumInfo={albumInfo.album}
      albumTracks={albumTracks}
      albumTitle={decodedAlbum}
      artist={decodedArtist}
    />
  );
}

export default AlbumPage;
