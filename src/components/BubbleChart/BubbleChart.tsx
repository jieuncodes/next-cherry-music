"use client";

import useMaxListeners from "@/hooks/useMaxListeners";
import useRefinedSimilarArtists from "@/hooks/useRefinedArtists";
import { BubbleChartContainer } from "@/styles/BubbleChart";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import renderBubbleChart from "./RenderBubbleChart";
import { bubbleChartConstants, enrichArtists } from "./bubbleChartHelpers";
import { AnimatedCirclesForwarded } from "./AnimatedCircle";

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const chartRef = useRef<SVGSVGElement>(null);
  const [centerArtist, setCenterArtist] = useState<ArtistDetail>(
    () => arr.items[0]
  );
  const { refinedSimilarArtists } = useRefinedSimilarArtists(centerArtist);
  const maxListenersVal = useMaxListeners(refinedSimilarArtists);

  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [isTopArtistChart, setIsTopArtistChart] = useState<boolean>(true);
  const [isCenterArtistLoading, setIsCenterArtistLoading] =
    useState<boolean>(true);
  const [enrichedArtists, setEnrichedArtists] = useState<EnrichedArtist[]>([]);

  useEffect(() => {
    setChartLoading(true);
    const fetchEnrichedArtists = async () => {
      console.log("fetching");
      if (
        !chartRef.current ||
        !centerArtist ||
        !refinedSimilarArtists ||
        maxListenersVal === 0
      )
        return;

      let svg = d3.select(chartRef.current);
      svg.selectAll("*").remove();

      try {
        const enrichedArtists = await enrichArtists(
          isTopArtistChart ? arr.items : refinedSimilarArtists,
          centerArtist
        );
        setEnrichedArtists(enrichedArtists);
        setChartLoading(false);
      } catch (error) {
        console.error("Failed to fetch enriched artists:", error);
        setChartLoading(false);
      }
    };

    fetchEnrichedArtists();
    console.log("chartLoading", chartLoading);
  }, [isCenterArtistLoading, maxListenersVal]);

  return (
    <BubbleChartContainer>
      <motion.h1
        layoutId="chart-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute m-6 font-bold text-2xl left-0"
      >
        {isTopArtistChart
          ? "Top Artists"
          : `Similar Artists - ${centerArtist.name}`}
      </motion.h1>
      {chartLoading && (
        <LoadingSpinner className={`absolute top-1/3 left-96`} />
      )}

      <AnimatedCirclesForwarded
        ref={chartRef}
        enrichedArtists={enrichedArtists}
        centerArtistMbid={centerArtist.mbid}
        maxListenersVal={maxListenersVal}
        isTopArtistChart={isTopArtistChart}
        setChartLoading={setChartLoading}
        setCenterArtist={setCenterArtist}
      />
    </BubbleChartContainer>
  );
}

export default BubbleChart;
