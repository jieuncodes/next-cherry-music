import { sanitizeName } from "@/lib/helpers";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";
import { Dispatch, SetStateAction } from "react";
import { bubbleChartConstants } from "./bubbleChartHelpers";

interface renderBubbleChartProps {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  enrichedArtists: EnrichedArtist[];
  centerArtist: ArtistDetail;
  sizeScale: d3.ScaleLinear<number, number>;
  setCenterArtist: Dispatch<SetStateAction<ArtistDetail>>;
  setIsTopArtistChart: Dispatch<SetStateAction<boolean>>;
}

function renderBubbleChart({
  svg,
  enrichedArtists,
  centerArtist,
  setCenterArtist,
  sizeScale,
  setIsTopArtistChart,
}: renderBubbleChartProps) {
  const circles = svg
    .selectAll("circle")
    .data(enrichedArtists.filter((artist) => artist.name !== centerArtist.name))
    .enter()
    .append("circle")
    .attr("cx", (item: EnrichedArtist) => item.x)
    .attr("cy", (item: EnrichedArtist) => item.y)
    .attr("r", (item) => sizeScale(Number(item.listeners)))
    .style("fill", (item) => `url(#artist-pattern-${sanitizeName(item.name)})`)
    .on("mouseover", function (d, i) {
      d3.select(this).attr("opacity", 0.7);
      const title = d3.select(this).select("title").text();
      const cx = parseFloat(d3.select(this).attr("cx"));
      const cy = parseFloat(d3.select(this).attr("cy"));
      svg
        .append("text")
        .attr("x", cx)
        .attr("y", cy)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("pointer-events", "none")
        .attr("fill", "black")
        .attr("font-size", "1em")
        .attr("font-weight", "bold")
        .attr("id", "hoverTitle")
        .text(title);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("opacity", 1);
      d3.select("#hoverTitle").remove();
    });
  circles.append("title").text((d: EnrichedArtist) => d.name);

  circles.on("click", function (event, artistData) {
    handleArtistClick({
      clickedArtist: artistData,
      svg,
      setCenterArtist,
      setIsTopArtistChart,
    });
  });

  d3.forceSimulation(enrichedArtists)
    .force(
      "x",
      d3
        .forceX((item: EnrichedArtist) =>
          item.name === centerArtist.name
            ? bubbleChartConstants.CHART_WIDTH / 2
            : item.x
        )
        .strength((item: EnrichedArtist) =>
          item.name === centerArtist.name ? 0.5 : 0.01
        )
    )
    .force(
      "y",
      d3
        .forceY((item: EnrichedArtist) =>
          item.name === centerArtist.name
            ? bubbleChartConstants.CHART_HEIGHT / 2
            : item.y
        )
        .strength((item: EnrichedArtist) =>
          item.name === centerArtist.name ? 0.5 : 0.07
        )
    )
    .force(
      "collide",
      d3.forceCollide((item: EnrichedArtist) =>
        item.name === centerArtist.name
          ? 110
          : sizeScale(Number(item.listeners)) + 10
      )
    )
    .on("tick", () => {
      circles
        .attr("cx", (item: EnrichedArtist) => item.x)
        .attr("cy", (item: EnrichedArtist) => item.y);
    });
}
export default renderBubbleChart;

interface handleArtistClickProps {
  clickedArtist: EnrichedArtist;
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  setCenterArtist: (artist: ArtistDetail) => void;
  setIsTopArtistChart: Dispatch<SetStateAction<boolean>>;
}

const handleArtistClick = ({
  clickedArtist,
  svg,
  setCenterArtist,
  setIsTopArtistChart,
}: handleArtistClickProps) => {
  const newCenterArtist = clickedArtist;
  svg.selectAll("*").remove();
  setCenterArtist(newCenterArtist);
  setIsTopArtistChart(false);
};
