import { bubbleChartConstants } from "@/components/BubbleChart/bubbleChartHelpers";
import { EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";
import { useEffect, useState } from "react";

type ForceSimulationProps = {
  enrichedArtists: EnrichedArtist[];
  centerArtistMbid: string;
  sizeScale: d3.ScaleLinear<number, number>;
};

export const useForceSimulation = ({
  enrichedArtists,
  centerArtistMbid,
  sizeScale,
}: ForceSimulationProps) => {
  const [collideLoading, setCollideLoading] = useState<boolean>(true);

  useEffect(() => {
    const simulation = d3
      .forceSimulation(enrichedArtists)
      .force(
        "x",
        d3
          .forceX((item: EnrichedArtist) =>
            item.mbid === centerArtistMbid
              ? bubbleChartConstants.CHART_WIDTH / 2
              : item.x
          )
          .strength((item: EnrichedArtist) =>
            item.mbid === centerArtistMbid ? 0.5 : 0.01
          )
      )
      .force(
        "y",
        d3
          .forceY((item: EnrichedArtist) =>
            item.mbid === centerArtistMbid
              ? bubbleChartConstants.CHART_HEIGHT / 2
              : item.y
          )
          .strength((item: EnrichedArtist) =>
            item.mbid === centerArtistMbid ? 0.5 : 0.07
          )
      )
      .force(
        "collide",
        d3.forceCollide((item: EnrichedArtist) =>
          item.mbid === centerArtistMbid
            ? 110
            : sizeScale(Number(item.listeners)) + 10
        )
      );
    simulation.on("end", () => setCollideLoading(false));

    return () => {
      simulation.stop();
    };
  }, [enrichedArtists, centerArtistMbid, sizeScale, collideLoading]);

  return { collideLoading };
};
