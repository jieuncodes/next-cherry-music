import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { LastFmTrack } from "@/types/trackTypes";

export async function fetchYoutubeId(
  query: string,
  track: LastFmTrack,
  id: string
): Promise<string | null> {
  if (query === "top") {
    const response = await fetch(
      `${process.env.URL}/api/youtube?track=${track.name}&artist=${track.artist.name}&id=${id}`
    );
    const data = await response.json();
    return data.videoId;
  } else {
    return fetchYouTubeVideoId({
      artist: track.artist.name,
      trackTitle: track.name,
    });
  }
}
