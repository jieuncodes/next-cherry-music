"use client";

import useMaxListeners from "@/hooks/useMaxListeners";
import useRefinedSimilarArtists from "@/hooks/useRefinedArtists";
import { ArtistDetail } from "@/types/trackTypes";
import * as d3 from "d3";
import { memo, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import renderBubbleChart from "./RenderBubbleChart";
import { CHART_HEIGHT, enrichArtists } from "./bubbleChartHelpers";
import { motion } from "framer-motion";

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
  const [isCenterArtistLoading, setIsCenterArtistLoading] =
    useState<boolean>(true);

  useEffect(() => {
    console.log("isCenterArtistLoading", isCenterArtistLoading);
  }, [isCenterArtistLoading]);
  useEffect(() => {
    const fetchEnrichedArtists = async () => {
      if (
        !chartRef.current ||
        !centerArtist ||
        !refinedSimilarArtists ||
        maxListenersVal === 0
      )
        return;
      console.log("centerArtist", centerArtist);
      let svg = d3.select(chartRef.current);
      svg.selectAll("*").remove();

      try {
        const enrichedArtists = await enrichArtists(
          isTopArtistChart ? arr.items : refinedSimilarArtists,
          centerArtist
        );
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
          setIsCenterArtistLoading,
        });

        setChartLoading(false);
      } catch (error) {
        console.error("Failed to fetch enriched artists:", error);
      }
    };

    fetchEnrichedArtists();
  }, [isCenterArtistLoading, maxListenersVal]);

  return (
    <div className="flex h-full w-full -ml-6 -mt-6">
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
        <svg
          width={window.innerWidth}
          height={CHART_HEIGHT}
          ref={chartRef}
        ></svg>
      </div>
    </div>
  );
}

export default BubbleChart;
