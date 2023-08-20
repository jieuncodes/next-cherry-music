"use client";

import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { ArtistDetail } from "@/types/trackTypes";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {
  CHART_HEIGHT,
  CHART_WIDTH,
  enrichArtists,
  renderBubbleChart,
} from "./bubbleChartHelpers";

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const { artistImgUrls, loading } = useArtistImgUrl(arr.items);
  const chartRef = useRef<SVGSVGElement>(null);
  const [centerArtist, setCenterArtist] = useState<ArtistDetail | null>(
    arr.items[0]
  );

  useEffect(() => {
    if (!chartRef.current || loading.size !== 0 || !centerArtist) return;
    let svg = d3.select(chartRef.current);
    if (svg.empty()) {
      svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);
    } else {
      svg.selectAll("*").remove();
    }

    const maxListenersVal = d3.max(arr.items, (item) => Number(item.listeners));
    const sizeScale = d3
      .scaleLinear()
      .domain([0, maxListenersVal!])
      .range([10, 90]);

    const enrichedArtists = enrichArtists(
      arr.items,
      centerArtist,
      artistImgUrls
    );
    renderBubbleChart(
      svg,
      enrichedArtists,
      centerArtist,
      sizeScale,
      artistImgUrls
    );
  }, [loading]);
  return (
    <div className="-ml-6 w-full -mt-6 flex justify-center align-middle">
      <svg width={window.innerWidth} height={CHART_HEIGHT} ref={chartRef}></svg>
      <div id="tooltip" className="absolute opacity-0"></div>
    </div>
  );
}

export default BubbleChart;
