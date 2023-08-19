"use client";
import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { ArtistDetail } from "@/types/trackTypes";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface EnrichedArtist extends ArtistDetail {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const { artistImgUrls, loading } = useArtistImgUrl(arr.items);
  const chartRef = useRef(null);
  const margin = 200;

  useEffect(() => {
    if (loading.size !== 0) return;
    let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    svg = d3.select(chartRef.current).select("svg");

    if (svg.empty()) {
      svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);
    } else {
      svg.selectAll("*").remove();
    }

    const maxListenersVal = d3.max(arr.items, (d) => Number(d.listeners));

    const sizeScale = d3
      .scaleLinear()
      .domain([0, maxListenersVal as number])
      .range([10, 100]);

    const width = 800;
    const height = 600;

    const enrichedArtists = arr.items.map((artist, index) => {
      const radius = sizeScale(Number(artist.listeners));
      return {
        ...artist,
        x: Math.random() * (width - 2 * (margin + radius)) + margin + radius,
        y: Math.random() * (height - 2 * (margin + radius)) + margin + radius,
        vx: 0,
        vy: 0,
        imgUrl: artistImgUrls.get(artist.name),
      };
    });

    const defs = svg.append("defs");

    const circles = svg
      .selectAll("circle")
      .data(enrichedArtists)
      .enter()
      .append("circle")
      .attr("cx", (d: EnrichedArtist) => d.x)
      .attr("cy", (d: EnrichedArtist) => d.y)
      .attr("r", (d) => sizeScale(Number(d.listeners)))
      .style("fill", (d, i) => `url(#artist-${i})`)
      .on("mouseover", function (d, i) {
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).attr("opacity", 1);
      });

    enrichedArtists.forEach((artist, index) => {
      const imageUrl = artistImgUrls.get(artist.name);
      const pattern = defs
        .append("pattern")
        .attr("id", `artist-${index}`)
        .attr("patternContentUnits", "objectBoundingBox")
        .attr("width", 1)
        .attr("height", 1);

      const imageWidth = 1;
      const imageHeight = 1;

      pattern
        .append("image")
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("href", imageUrl || "images/default_band.png")
        .attr("width", imageWidth)
        .attr("height", imageHeight)
        .attr("x", (1 - imageWidth) / 2)
        .attr("y", (1 - imageHeight) / 2);
    });

    d3.forceSimulation(enrichedArtists)
      .force("x", d3.forceX(800 / 2).strength(0.05))
      .force("y", d3.forceY(600 / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide(
          (d: EnrichedArtist) => sizeScale(Number(d.listeners)) + 10
        )
      )
      .on("tick", () => {
        circles
          .attr("cx", (d: EnrichedArtist) => d.x)
          .attr("cy", (d: EnrichedArtist) => d.y);
      });
  }, [loading]);

  return <div ref={chartRef} className="-m-6"></div>;
}

export default BubbleChart;
