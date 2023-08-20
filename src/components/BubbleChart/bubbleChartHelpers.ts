import { sanitizeName } from "@/lib/helpers";
import { ArtistDetail, EnrichedArtist } from "@/types/trackTypes";
import * as d3 from "d3";

export const CHART_WIDTH = 800;
export const CHART_HEIGHT = 600;
const MARGIN = 200;
const CENTER_RADIUS = 100;
const RING_RADIUS_OFFSET = 5;

export const enrichArtists = (
  artists: ArtistDetail[],
  centerArtist: ArtistDetail | null,
  artistImgUrls: Map<string, string>
): EnrichedArtist[] => {
  return artists.map((artist) => {
    let xPos, yPos;
    if (centerArtist && artist.mbid === centerArtist.mbid) {
      xPos = CHART_WIDTH / 2;
      yPos = CHART_HEIGHT / 2;
    } else {
      do {
        xPos = Math.random() * (CHART_WIDTH - 2 * MARGIN) + MARGIN;
        yPos = Math.random() * (CHART_HEIGHT - 2 * MARGIN) + MARGIN;
      } while (
        Math.abs(xPos - CHART_WIDTH / 2) < 100 &&
        Math.abs(yPos - CHART_HEIGHT / 2) < 100
      );
    }
    return {
      ...artist,
      x: xPos,
      y: yPos,
      vx: 0,
      vy: 0,
      imgUrl: artistImgUrls.get(artist.name),
    };
  });
};

export const renderBubbleChart = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  enrichedArtists: EnrichedArtist[],
  centerArtist: ArtistDetail,
  sizeScale: d3.ScaleLinear<number, number>,
  artistImgUrls: Map<string, string>
) => {
  svg
    .append("circle")
    .attr("cx", CHART_WIDTH / 2)
    .attr("cy", CHART_HEIGHT / 2)
    .attr("r", () => CENTER_RADIUS + RING_RADIUS_OFFSET)
    .attr("fill", `url(#artist-pattern-${sanitizeName(centerArtist.name)})`)
    .attr("stroke", "#ff5173")
    .attr("stroke-width", 2);

  const defs = svg.append("defs");

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
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("opacity", 1);
    });

  enrichedArtists.forEach((artist, index) => {
    const imageUrl = artistImgUrls.get(artist.name);
    const pattern = defs
      .append("pattern")
      .attr("id", `artist-pattern-${sanitizeName(artist.name)}`)
      .attr("patternContentUnits", "objectBoundingBox")
      .attr("width", 1)
      .attr("height", 1);

    pattern
      .append("image")
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("href", imageUrl || "images/default_band.png")
      .attr("width", 1)
      .attr("height", 1);
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
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .attr("fill", "white")
    .attr("font-size", "1.5em")
    .attr("font-weight", "bold")
    .attr("class", "text-stroke-black")
    .text(centerArtist.name);
};
