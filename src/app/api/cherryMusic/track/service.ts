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
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL;
  let url = new URL("/api/cherryMusic/track?query=top", baseURL);

  if (artist) url.searchParams.append("artist", artist);
  if (tag) url.searchParams.append("tag", tag);
  if (album) url.searchParams.append("album", album);
  if (trackTitle) url.searchParams.append("track", trackTitle);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `FetchCherryMusicTracks response was not ok: ${response.status},
      url: ${url}`
    );
  const data = await response.json();
  return data;
}
