import { cn } from "@/lib/utils/utils";
import { TrackTitle } from "@/styles/TrackCard";
import { Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface MarqueeProps {
  trackTitleText: string;
  largeTitle?: boolean;
  isBlack?: boolean;
  size?: "small" | "medium" | "large";
  onPlaylist?: boolean;
}

function Marquee({
  trackTitleText,
  largeTitle,
  isBlack,
  size,
  onPlaylist,
}: MarqueeProps) {
  const [ref, { width }] = useMeasure();

  const variants: Variants = {
    initial: { x: 0 },
    animate: { x: -(width / 2) - 24.5 },
  };

  const transition = {
    ease: "linear",
    duration: 6,
    repeat: Infinity,
  };

  return (
    <TrackTitle
      className={cn(
        "flex overflow-hidden gap-32 relative whitespace-nowrap  ",
        `${onPlaylist ? "-ml-2" : ""}`
      )}
    >
      <div
        className={cn(
          `whitespace-nowrap shrink-0 flex justify-around min-w-full gap-12 ${
            isBlack ? "text-black" : "text-white"
          }`,
          ` ${onPlaylist ? "text-xs -mt-1" : ""}`
        )}
      >
        <motion.div
          ref={ref}
          className={cn(`track-title ${largeTitle ? "text-medium" : ""}`)}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={transition}
        >
          <span style={{ marginRight: "3rem" }}>{trackTitleText}</span>
          <span>{trackTitleText}</span>
        </motion.div>
      </div>
    </TrackTitle>
  );
}

export default Marquee;
