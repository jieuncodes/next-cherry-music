import fetchYouTubeVideoId from "@/lib/fetchYouTubeVideoId";
import { simpleHash } from "@/lib/helpers";
import { LastFmTrack } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    throw new Error("Query parameter is required.");
  }

  let tracksToProcess;

  switch (query) {
    case "top":
      const topTracksResponse = await fetch(
        ` ${process.env.URL}/api/lastFm/top-tracks`
      );
      tracksToProcess = await topTracksResponse.json();
      break;

    case "artist-top":
      const artist = req.nextUrl.searchParams.get("artist");
      if (!artist) {
        throw new Error("Artist name is required for artist-top query.");
      }
      const artistTopTrackResponse = await fetch(
        `${process.env.URL}/api/lastFm/artist/get-top-tracks?artist=${artist}`
      );
      const data = await artistTopTrackResponse.json();
      tracksToProcess = data.toptracks.track;
      console.log("tracksToProcess", tracksToProcess);
      break;
    default:
      throw new Error("Invalid query parameter.");
  }

  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTrack) => {
      const fetchDetailResponse = await fetch(
        `${process.env.URL}/api/lastFm/track/details?trackTitle=${track.name}&artist=${track.artist.name}`
      );

      const trackDetail = await fetchDetailResponse.json();

      const urlLastPart = trackDetail.url.split("/");
      const id = simpleHash(urlLastPart[urlLastPart.length - 1]);

      let youtubeId;
      switch (query) {
        case "top":
          const youtubeResponse = await fetch(
            `${process.env.URL}/api/youtube?track=${track.name}&artist=${track.artist.name}&id=${id}`
          );
          const youtubeData = await youtubeResponse.json();
          youtubeId = youtubeData.videoId || "";
          break;

        case "artist-top":
          youtubeId = await fetchYouTubeVideoId({
            artist: track.artist.name,
            trackTitle: track.name,
          });
          break;
        default:
          throw new Error("Invalid query parameter.");
      }

      return {
        id,
        trackTitle: track.name,
        artist: track.artist.name,
        youtubeId,
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const allTrackDetailsWithYoutube = await Promise.all(trackDetailsPromises);
  return NextResponse.json([...allTrackDetailsWithYoutube]);
}
