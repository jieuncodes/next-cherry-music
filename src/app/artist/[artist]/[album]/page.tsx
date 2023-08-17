import Album from "@/components/Album/Album";

async function AlbumPage({
  params,
}: {
  params: { artist: string; album: string };
}) {
  const decodedAlbum = decodeURIComponent(params.album);
  const decodedArtist = decodeURIComponent(params.artist);

  return <Album albumTitle={decodedAlbum} artist={decodedArtist} />;
}

export default AlbumPage;
