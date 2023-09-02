import { sanitizeName } from "@/lib/helpers";
import { ArtistDetail, EnrichedArtist } from "@/types/lastFmTypes";
import * as d3 from "d3";
import { Dispatch, SetStateAction } from "react";
import { CHART_HEIGHT, CHART_WIDTH } from "./bubbleChartHelpers";

interface renderBubbleChartProps {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  enrichedArtists: EnrichedArtist[];
  centerArtist: ArtistDetail;
  sizeScale: d3.ScaleLinear<number, number>;
  setCenterArtist: Dispatch<SetStateAction<ArtistDetail>>;
  setIsTopArtistChart: Dispatch<SetStateAction<boolean>>;
  handleCenterArtistClick: (artistName: string) => void;
}

const CENTER_RADIUS = 100;
const RING_RADIUS_OFFSET = 5;

function renderBubbleChart({
  svg,
  enrichedArtists,
  centerArtist,
  setCenterArtist,
  sizeScale,
  setIsTopArtistChart,
  handleCenterArtistClick,
}: renderBubbleChartProps) {
  const defs = svg.append("defs");
  enrichedArtists.forEach((artist, index) => {
    const pattern = defs
      .append("pattern")
      .attr("id", `artist-pattern-${sanitizeName(artist.name)}`)
      .attr("patternContentUnits", "objectBoundingBox")
      .attr("width", 1)
      .attr("height", 1);

    pattern
      .append("image")
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("href", artist.imgUrl)
      .attr("width", 1)
      .attr("height", 1);
  });

  svg
    .append("circle")
    .attr("cx", CHART_WIDTH / 2)
    .attr("cy", CHART_HEIGHT / 2)
    .attr("r", () => CENTER_RADIUS + RING_RADIUS_OFFSET)
    .attr("fill", `url(#artist-pattern-${sanitizeName(centerArtist.name)})`)
    .attr("layoutId", `${centerArtist.mbid}`)
    .attr("class", "centerArtistBubble")
    .on("click", () => handleCenterArtistClick(centerArtist.name));

  const circles = svg
    .selectAll("circle")
    .data(enrichedArtists.filter((artist) => artist.name !== centerArtist.name))
    .enter()
    .append("circle")
    .attr("cx", (item: EnrichedArtist) => item.x)
    .attr("cy", (item: EnrichedArtist) => item.y)
    .attr("r", (item) => sizeScale(Number(item.listeners)))
    .style("fill", (item) => `url(#artist-pattern-${sanitizeName(item.name)})`)
    .attr("layoutId", (item) => `${item.mbid}`)
    .on("mouseover", function (d, i) {
      d3.select(this).attr("opacity", 0.7).attr("cursor", "pointer");
      const title = d3.select(this).select("title").text();
      const cx = parseFloat(d3.select(this).attr("cx"));
      const cy = parseFloat(d3.select(this).attr("cy"));
      svg
        .append("text")
        .attr("x", cx)
        .attr("y", cy)
        .attr("class", "bubbleText")
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
          item.name === centerArtist.name ? CHART_WIDTH / 2 : item.x
        )
        .strength((item: EnrichedArtist) =>
          item.name === centerArtist.name ? 0.5 : 0.01
        )
    )
    .force(
      "y",
      d3
        .forceY((item: EnrichedArtist) =>
          item.name === centerArtist.name ? CHART_HEIGHT / 2 : item.y
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

  svg
    .append("text")
    .attr("x", CHART_WIDTH / 2)
    .attr("y", CHART_HEIGHT / 2)
    .attr("class", "centerArtistBubbleText")
    .text(centerArtist.name);
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
  setCenterArtist,
  setIsTopArtistChart,
}: handleArtistClickProps) => {
  const newCenterArtist = clickedArtist;
  setCenterArtist(newCenterArtist);
  setIsTopArtistChart(false);
};
