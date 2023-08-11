import { NextResponse } from "next/server";

export async function fetchTagTopAlbums(tag: string) {
  const response = await fetch(`/api/lastFm/tag/get-top-albums?tag=${tag}`);
  const data = await response.json();
  return data.albums.album;
}
