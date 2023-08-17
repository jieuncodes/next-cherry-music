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
  let url = `${process.env.NEXT_PUBLIC_URL}/api/cherryMusic/track?query=${query}`;

  if (artist) url += `&artist=${artist}`;
  if (tag) url += `&tag=${tag}`;
  if (album) url += `&album=${album}`;
  if (trackTitle) url += `&track=${trackTitle}`;

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `FetchCherryMusicTracks response was not ok: ${response.status},
      url: ${url}`
    );
  const data = await response.json();
  return data;
}
