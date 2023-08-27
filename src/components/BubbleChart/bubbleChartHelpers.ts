import { getSpotifyArtistImg } from "@/app/api/spotify/service";
import { ArtistDetail, EnrichedArtist } from "@/types/lastFmTypes";

export const CHART_WIDTH = 800;
export const CHART_HEIGHT = 600;
const MARGIN = 200;

export const enrichArtists = (
  artists: ArtistDetail[],
  centerArtist: ArtistDetail | null
): Promise<EnrichedArtist[]> => {
  const res = Promise.all(
    artists.map(async (artist) => {
      let xPos, yPos;
      if (
        centerArtist &&
        artist.mbid.length > 0 &&
        artist.mbid === centerArtist.mbid
      ) {
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
      const imgUrl = await getSpotifyArtistImg(artist.name);
      return {
        ...artist,
        x: xPos,
        y: yPos,
        vx: 0,
        vy: 0,
        imgUrl,
      };
    })
  );
  return res;
};
