import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { sanitizeName } from "@/lib/helpers";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";

export const CHART_WIDTH = 800;
export const CHART_HEIGHT = 600;
const MARGIN = 200;

export const enrichArtists = (
  artists: ArtistDetail[],
  centerArtist: ArtistDetail | null,
  artistImgUrls: Map<string, string>
): EnrichedArtist[] => {
  console.log("", artists);
  return artists.map((artist) => {
    let xPos, yPos;
    if (centerArtist && artist.mbid === centerArtist.mbid) {
      xPos = CHART_WIDTH / 2;
      yPos = CHART_HEIGHT / 2;
    } else {
      do {
        xPos = Math.random() * (CHART_WIDTH - 2 * MARGIN) + MARGIN;
        yPos = Math.random() * (CHART_HEIGHT - 2 * MARGIN) + MARGIN;
      } while (
        Math.abs(xPos - CHART_WIDTH / 2) < 100 &&
        Math.abs(yPos - CHART_HEIGHT / 2) < 100
      );
    }
    return {
      ...artist,
      x: xPos,
      y: yPos,
      vx: 0,
      vy: 0,
      imgUrl: artistImgUrls.get(artist.name),
    };
  });
};
