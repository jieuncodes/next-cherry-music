import { bubbleChartConstants } from "@/components/BubbleChart/bubbleChartHelpers";
import { sanitizeName } from "@/lib/helpers";
import { EnrichedArtist } from "@/types/trackTypes";
import { motion } from "framer-motion";
import { Fragment, RefObject, forwardRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useForceSimulation } from "@/hooks/useForceSimulation";

export const AnimatedCirclesForwarded = forwardRef<
  SVGSVGElement,
  {
    enrichedArtists: EnrichedArtist[];
    centerArtistMbid: string;
    maxListenersVal: number;
    isTopArtistChart: boolean;
    setChartLoading: (loading: boolean) => void;
  }
>(function AnimatedCircles(
  {
    enrichedArtists,
    centerArtistMbid,
    maxListenersVal,
    isTopArtistChart,
    setChartLoading,
  },
  ref
) {
  const [hoveredCircle, setHoveredCircle] = useState<{
    title: string;
    cx: number;
    cy: number;
  } | null>(null);

  const sizeScale = d3
    .scaleLinear()
    .domain([0, maxListenersVal])
    .range(isTopArtistChart ? [20, 55] : [40, 80]);
  const { collideLoading } = useForceSimulation({
    enrichedArtists,
    centerArtistMbid,
    sizeScale,
  });
  console.log("collideLoading", collideLoading);

  useEffect(() => {
    setChartLoading(collideLoading);
    console.log("collideLoading", collideLoading);
  }, [collideLoading]);

  const handleHoverCircleStart = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    artistData: EnrichedArtist
  ) => {
    if (!event.currentTarget) return;
    const circleElement = event.currentTarget as SVGCircleElement;
    circleElement.style.opacity = "0.7";
    const title = artistData.name;
    const cx = parseFloat(circleElement.getAttribute("cx")!);
    const cy = parseFloat(circleElement.getAttribute("cy")!);
    setHoveredCircle({ title, cx, cy });
  };

  const handleHoverCircleEnd = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>
  ) => {
    if (!event.currentTarget) return;
    const circleElement = event.currentTarget as SVGCircleElement;
    setHoveredCircle(null);
    circleElement.style.opacity = "1";
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={bubbleChartConstants.CHART_WIDTH}
      height={bubbleChartConstants.CHART_HEIGHT}
      ref={ref}
    >
      {enrichedArtists.map((artist) => (
        <defs key={`def-${artist.mbid}`}>
          <pattern
            key={artist.name}
            id={`artist-pattern-${sanitizeName(artist.name)}`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image width={1} height={1} xlinkHref={artist.imgUrl} />
          </pattern>
        </defs>
      ))}
      {enrichedArtists.map((artist) =>
        artist.mbid === centerArtistMbid ? (
          <Fragment key="center-artist">
            <motion.circle
              layoutId={artist.mbid}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              cx={bubbleChartConstants.CHART_WIDTH / 2}
              cy={bubbleChartConstants.CHART_HEIGHT / 2}
              r={
                bubbleChartConstants.CENTER_RADIUS +
                bubbleChartConstants.RING_RADIUS_OFFSET
              }
              fill={`url(#artist-pattern-${sanitizeName(artist.name)})`}
              stroke="#ff5173"
              strokeWidth="2"
              className="center-artist"
            />
            <text
              x={bubbleChartConstants.CHART_WIDTH / 2}
              y={bubbleChartConstants.CHART_HEIGHT / 2}
              textAnchor="middle"
              className="fill-white text-lg font-bold text-stroke-black"
            >
              {artist.name}
            </text>
          </Fragment>
        ) : (
          <Fragment key={artist.mbid}>
            <motion.circle
              layoutId={artist.mbid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              cx={artist.x}
              cy={artist.y}
              r={sizeScale(Number(artist.listeners))}
              fill={`url(#artist-pattern-${sanitizeName(artist.name)})`}
              className="cursor-pointer"
              onClick={() => {
                console.log("onclickhandle");
                // setIsCenterArtistLoading(true);
                // setCenterArtist(artist);
                // setIsCenterArtistLoading(false);
              }}
              onMouseOver={(e) => handleHoverCircleStart(e, artist)}
              onMouseLeave={(e) => handleHoverCircleEnd(e)}
            ></motion.circle>
            {hoveredCircle && (
              <text
                x={hoveredCircle.cx}
                y={hoveredCircle.cy}
                textAnchor="middle"
                dy=".35em"
                pointerEvents="none"
                fill="black"
                fontSize="1em"
                fontWeight="bold"
                id="hoverTitle"
              >
                {hoveredCircle.title}
              </text>
            )}
          </Fragment>
        )
      )}
    </svg>
  );
});
