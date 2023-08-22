import { getSpotifyArtistImg } from "@/app/api/spotify/service";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";

export const bubbleChartConstants = {
  CENTER_RADIUS: 100,
  RING_RADIUS_OFFSET: 5,
  CHART_WIDTH: 800,
  CHART_HEIGHT: 600,
  MARGIN: 200,
};

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
        xPos = bubbleChartConstants.CHART_WIDTH / 2;
        yPos = bubbleChartConstants.CHART_HEIGHT / 2;
      } else {
        do {
          xPos =
            Math.random() *
              (bubbleChartConstants.CHART_WIDTH -
                2 * bubbleChartConstants.MARGIN) +
            bubbleChartConstants.MARGIN;
          yPos =
            Math.random() *
              (bubbleChartConstants.CHART_HEIGHT -
                2 * bubbleChartConstants.MARGIN) +
            bubbleChartConstants.MARGIN;
        } while (
          Math.abs(xPos - bubbleChartConstants.CHART_WIDTH / 2) < 100 &&
          Math.abs(yPos - bubbleChartConstants.CHART_HEIGHT / 2) < 100
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
