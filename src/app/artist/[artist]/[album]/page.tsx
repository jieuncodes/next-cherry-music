import Album from "@/components/Album/Album";

async function AlbumPage({
  params,
}: {
  params: { artist: string; album: string };
}) {
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);

  const albumTracksResponse = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=album-tracks&artist=${params.artist}&album=${params.album}`
  );
  const albumTracks = await albumTracksResponse.json();
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
