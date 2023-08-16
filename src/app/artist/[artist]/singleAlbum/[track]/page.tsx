import Album from "@/components/Album/Album";

async function SingleAlbumPage({
  params,
}: {
  params: { artist: string; track: string };
}) {
  const decodedTrack = decodeURIComponent(params.track);
  const decodedArtist = decodeURIComponent(params.artist);

  const trackInfoResponse = await fetch(
    `${process.env.URL}/api/cherryMusic/track?query=track&track=${params.track}&artist=${params.artist}`
  );
  const trackInfo = await trackInfoResponse.json();
  console.log("trackInfo", trackInfo);
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
