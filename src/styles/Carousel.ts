import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const CarouselContainer = tw.div`flex absolute w-full h-72`;

export const CarouselBox = tw(
  motion.div
)`flex-none relative h-80 w-full -ml-6 -mt-6  overflow-hidden p-10 pt-20 pl-16 justify-center xl:p-20 
`;
export const CarouselImg = tw(motion.div)`absolute right-10 drop-shadow-md`;
export const CarouselText = tw(motion.div)``;

export const Title = tw(motion.div)`font-extrabold text-4xl mb-5`;

export const Description = tw(motion.p)`w-72 mb-10 mt-5`;

export const Buttons = tw(motion.div)`absolute w-40 flex justify-between z-20`;

export const NavBtnContainer = tw.div`absolute z-10 w-full h-full -left-6 bg-none flex justify-between items-center`;
