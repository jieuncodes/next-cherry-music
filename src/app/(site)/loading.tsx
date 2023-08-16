"use client";

import { motion } from "framer-motion";

function LoadingSpinner() {
  const draw = {
    start: { pathLength: 0, pathOffset: 0, opacity: 0 },
    end: {
      pathLength: 1,
      pathOffset: 0,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          bounce: 0,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
  };
  return (
    <div className="w-full h-full flex justify-center align-middle pr-12 items-center">
      <motion.svg
        initial={{ rotate: 10 }}
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff2d57f1"
        stroke-width="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          variants={draw}
          initial="start"
          animate="end"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        />
        <motion.path
          variants={draw}
          initial="start"
          animate="end"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        />
        <motion.path
          variants={draw}
          initial="start"
          animate="end"
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
        />
        <motion.path
          variants={draw}
          initial="start"
          animate="end"
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
        />
      </motion.svg>
    </div>
  );
}

export default LoadingSpinner;
