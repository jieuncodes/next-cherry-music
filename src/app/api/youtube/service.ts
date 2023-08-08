import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { LastFmTrack } from "@/types/trackTypes";

export async function fetchYoutubeId(
  query: string,
  track: LastFmTrack,
  id: string
): Promise<string | null> {
  return fetchYouTubeVideoId(track.url);
}
