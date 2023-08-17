"use client";

import { motion } from "framer-motion";

function CherryLoader() {
  const breatheAnimation = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <div className="w-full h-full flex justify-center align-middle pr-12 items-center -mt-10">
      <motion.svg
        initial={{ rotate: 10 }}
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff2d57f1"
        variants={breatheAnimation}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        />
        <path
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
        />
        <path
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
        />
      </motion.svg>
    </div>
  );
}

export default CherryLoader;
