export async function fetchTagTopAlbums(tag: string) {
  const response = await fetch(`/api/lastFm/tag/get-top-albums?tag=${tag}`);
  const data = await response.json();
  return data.albums.album;
}

export async function fetchTagTopTracks(tag: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/lastFm/tag/get-top-tracks?tag=${tag}`
  );
  const data = await response.json();
  return data.tracks.track;
}

export const fetchTagTopArtists = async (tag: string) => {
  const response = await fetch(`/api/lastFm/tag/get-top-artists?tag=${tag}`);
  const data = await response.json();
  return data.topartists.artist;
};
