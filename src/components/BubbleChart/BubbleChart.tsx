"use client";

import useMaxListeners from "@/hooks/useMaxListeners";
import useRefinedSimilarArtists from "@/hooks/useRefinedArtists";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import renderBubbleChart from "./RenderBubbleChart";
import { CHART_HEIGHT, CHART_WIDTH, enrichArtists } from "./bubbleChartHelpers";

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const chartRef = useRef<SVGSVGElement>(null);
  const [centerArtist, setCenterArtist] = useState<ArtistDetail>(arr.items[0]);
  const { refinedSimilarArtists } = useRefinedSimilarArtists(centerArtist);
  const maxListenersVal = useMaxListeners(refinedSimilarArtists);
  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [isTopArtistChart, setIsTopArtistChart] = useState<boolean>(true);
  useState<boolean>(true);

  useEffect(() => {
    console.log(" maxListenersVal, ", maxListenersVal);
    const fetchEnrichedArtists = async () => {
      if (
        !chartRef.current ||
        !centerArtist ||
        !refinedSimilarArtists ||
        maxListenersVal === 0
      )
        return;
      console.log("useEffect");
      let svg = d3.select(chartRef.current);
      svg.selectAll("*").remove();

      try {
        const enrichedArtists = await enrichArtists(
          isTopArtistChart ? arr.items : refinedSimilarArtists,
          centerArtist
        );
        const img = new Image();
        const centerArtistImgUrl = enrichedArtists.filter(
          (artist: EnrichedArtist) => artist.name === centerArtist.name
        )[0].imgUrl;
        img.src = centerArtistImgUrl;
        img.onload = () => {
          renderBubbleChart({
            svg,
            enrichedArtists,
            centerArtist,
            setCenterArtist,
            sizeScale: d3
              .scaleLinear()
              .domain([0, maxListenersVal])
              .range(isTopArtistChart ? [20, 55] : [40, 80]),
            setIsTopArtistChart,
          });
          console.log("chart rendered");
        };
        img.onerror = () => {
          console.error("Failed to load centerArtist image");
        };

        setChartLoading(false);
      } catch (error) {
        console.error("Failed to fetch enriched artists:", error);
      }
    };

    fetchEnrichedArtists();
  }, [centerArtist, maxListenersVal]);

  return (
    <div className="flex justify-center align-middle h-full w-full -ml-6 -mt-6">
      <div className="w-full h-600">
        <motion.h1
          layoutId="chart-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute m-6 font-bold text-2xl"
        >
          {isTopArtistChart
            ? "Top Artists"
            : `Similar Artists - ${centerArtist.name}`}
        </motion.h1>
        {chartLoading && (
          <LoadingSpinner className={`absolute top-1/3 left-96 `} />
        )}
        <div className=" w-full mr-6 flex justify-center align-middle ">
          <svg width={CHART_WIDTH} height={CHART_HEIGHT} ref={chartRef}></svg>
        </div>
      </div>
    </div>
  );
}

export default memo(BubbleChart);
