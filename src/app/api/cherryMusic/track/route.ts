import { simpleHash } from "@/lib/helpers";
import { Track } from "@/lib/server/database.types";
import { LastFmTopTracks } from "@/types/trackTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    throw new Error("Query parameter is required.");
  }

  const [type, count] = query.split("-"); //e.g. top-50
  const topCount = Number(count);

  let tracksToProcess;

  switch (type) {
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
        `/api/lastFm/artist/get-top-tracks?artist=${artist}`
      );
      tracksToProcess = await artistTopTrackResponse.json();
      break;
    default:
      throw new Error("Invalid query parameter.");
  }

  const trackDetailsPromises = tracksToProcess.map(
    async (track: LastFmTopTracks) => {
      const fetchDetailResponse = await fetch(
        `${process.env.URL}/api/lastFm/track/details?trackTitle=${track.name}&artist=${track.artist.name}`
      );

      const trackDetail = await fetchDetailResponse.json();

      const urlLastPart = trackDetail.url.split("/");
      const id = simpleHash(urlLastPart[urlLastPart.length - 1]);

      const youtubeResponse = await fetch(
        `${process.env.URL}/api/youtube?track=${track.name}&artist=${track.artist.name}&id=${id}`
      );
      const youtubeData = await youtubeResponse.json();

      return {
        id,
        trackTitle: track.name,
        artist: track.artist.name,
        youtubeId: youtubeData.videoId || "",
        albumTitle: trackDetail.album?.title || "",
        albumImgUrl: trackDetail.album?.image[3]["#text"],
        tags: trackDetail.toptags?.tag,
        playCount: trackDetail.playcount,
      };
    }
  );

  const allTrackDetailsWithYoutube = await Promise.all(trackDetailsPromises);
  return NextResponse.json({ allTrackDetailsWithYoutube });
}
