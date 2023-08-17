export async function fetchCherryMusicTracks({
  query,
  artist,
  tag,
  album,
  trackTitle,
}: {
  query: string;
  artist?: string;
  tag?: string;
  album?: string;
  trackTitle?: string;
}) {
  let url = `${process.env.URL}/api/cherryMusic/track?query=${query}`;

  if (artist) url += `&artist=${artist}`;
  if (tag) url += `&tag=${tag}`;
  if (album) url += `&album=${album}`;
  if (trackTitle) url += `&track=${trackTitle}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
