"use client";

import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { ArtistDetail, LastFmArtistInfo } from "@/types/trackTypes";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { CHART_HEIGHT, enrichArtists } from "./bubbleChartHelpers";
import renderBubbleChart from "./RenderBubbleChart";
import useRefinedSimilarArtists from "@/hooks/useRefinedArtists";
import { fetchSpotifyArtist } from "@/app/api/spotify/service";

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const chartRef = useRef<SVGSVGElement>(null);
  const [centerArtist, setCenterArtist] = useState<ArtistDetail>(arr.items[0]);
  const { refinedSimilarArtists } = useRefinedSimilarArtists(centerArtist);
  const [maxListeneresVal, setMaxListenersVal] = useState<number>(0);

  const sourceArtists =
    centerArtist === arr.items[0] ? arr.items : refinedSimilarArtists;
  const { artistImgUrls, loading } = useArtistImgUrl(sourceArtists);

  const [centerArtistImgUrl, setCenterArtistImgUrl] = useState<string>("");
  useEffect(() => {
    console.log("centerArtist", centerArtist);
    const getCenterArtistImgUrl = async () => {
      const centerArtistData = await fetchSpotifyArtist(centerArtist.name);
      console.log(
        "centerArtistData.best_match?.items[0]?.images[0]?.url",
        centerArtistData.best_match?.items[0]?.images[0]?.url
      );
      setCenterArtistImgUrl(
        centerArtistData.best_match?.items[0]?.images[0]?.url
      );
    };
    getCenterArtistImgUrl();
  }, [centerArtist]);

  useEffect(() => {
    const getMaxListeners = (arr: ArtistDetail[]) => {
      const maxListenersVal = d3.max(refinedSimilarArtists, (item) => {
        return Number(item.listeners);
      });
      if (maxListenersVal) setMaxListenersVal(maxListenersVal);
    };
    getMaxListeners(refinedSimilarArtists);
  }, [refinedSimilarArtists]);

  useEffect(() => {
    if (
      !chartRef.current ||
      loading.size !== 0 ||
      !centerArtist ||
      !refinedSimilarArtists
    )
      return;
    let svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    if (centerArtist === arr.items[0]) {
      console.log("first render");
      const enrichedArtists = enrichArtists(
        arr.items,
        centerArtist,
        artistImgUrls
      );

      loading.size == 0 &&
        renderBubbleChart({
          svg,
          enrichedArtists,
          centerArtist,
          sizeScale: d3
            .scaleLinear()
            .domain([0, maxListeneresVal])
            .range([10, 55]),
          artistImgUrls,
          centerArtistImgUrl,
          setCenterArtist,
        });
    } else {
      const enrichedArtists = enrichArtists(
        refinedSimilarArtists,
        centerArtist,
        artistImgUrls
      );
      loading.size == 0 &&
        renderBubbleChart({
          svg,
          enrichedArtists,
          centerArtist,
          sizeScale: d3
            .scaleLinear()
            .domain([0, maxListeneresVal])
            .range([30, 80]),
          artistImgUrls,
          centerArtistImgUrl,
          setCenterArtist,
        });
    }
  }, [maxListeneresVal, centerArtistImgUrl]);

  return (
    <div className="-ml-6 w-full -mt-6 flex justify-center align-middle">
      <svg width={window.innerWidth} height={CHART_HEIGHT} ref={chartRef}></svg>
    </div>
  );
}

export default BubbleChart;
