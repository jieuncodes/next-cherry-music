import { TrackTitle } from "@/styles/TrackCard";
import { Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";

const Marquee: React.FC<{ trackTitleText: string }> = ({ trackTitleText }) => {
  const [ref, { width }] = useMeasure();

  const variants: Variants = {
    initial: { x: 0 },
    animate: { x: -width / 2 -24.5 },
  };

  const transition = {
    ease: "linear",
    duration: 6,
    repeat: Infinity,
  };

  return (
    <TrackTitle className="flex overflow-hidden gap-32 relative whitespace-nowrap">
      <div className="whitespace-nowrap shrink-0 flex justify-around min-w-full gap-12">
        <motion.div
          ref={ref}
          className="track-title"
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
};

export default Marquee;
