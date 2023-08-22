import { bubbleChartConstants } from "@/components/BubbleChart/bubbleChartHelpers";
import { sanitizeName } from "@/lib/helpers";
import { EnrichedArtist } from "@/types/trackTypes";
import { motion } from "framer-motion";
import { Fragment, RefObject, forwardRef } from "react";
import * as d3 from "d3";

export const AnimatedCirclesForwarded = forwardRef<
  SVGSVGElement,
  {
    enrichedArtists: EnrichedArtist[];
    centerArtistMbid: string;
    maxListenersVal: number;
    isTopArtistChart: boolean;
  }
>(function AnimatedCircles(
  { enrichedArtists, centerArtistMbid, maxListenersVal, isTopArtistChart },
  ref
) {
  const sizeScale = d3
    .scaleLinear()
    .domain([0, maxListenersVal])
    .range(isTopArtistChart ? [20, 55] : [40, 80]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={bubbleChartConstants.CHART_WIDTH}
      height={bubbleChartConstants.CHART_HEIGHT}
      ref={ref}
    >
      {enrichedArtists.map((artist) => (
        <defs key={artist.mbid}>
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
          <Fragment key={artist.mbid}>
            <motion.circle
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              layoutId="center-artist-circle"
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
          <motion.circle
            key={artist.mbid}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )
      )}
    </svg>
  );
});
