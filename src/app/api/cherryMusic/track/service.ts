interface fetchCherryMusicTracksProps {
  query: string;
  count?: number | null;
  offset?: number | null;
  artist?: string;
  tag?: string;
  album?: string;
  trackTitle?: string;
}
export async function fetchCherryMusicTracks({
  query,
  count,
  offset,
  artist,
  tag,
  album,
  trackTitle,
}: fetchCherryMusicTracksProps) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL;

  let url = new URL(`/api/cherryMusic/track?query=${query}`, baseURL);

  if (count) url.searchParams.append("count", count.toString());
  if (offset) url.searchParams.append("offset", offset.toString());
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
