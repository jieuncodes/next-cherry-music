import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const CarouselContainer = tw.div`flex absolute w-full h-72`;

export const CarouselBox = tw(
  motion.div
)`flex-none relative h-80 w-full -ml-6 -mt-6  overflow-hidden p-10 pt-20 pl-16 justify-center xl:p-20
`;
// bg-gradient-to-r from-pink-100 from-10% via-white via-50% to-indigo-100 to-90%
export const Title = tw.span`font-extrabold text-4xl mb-5`;

export const Description = tw.p`w-72 mb-10 mt-5`;

export const Buttons = tw.div`absolute w-40 flex justify-between z-20`;

export const NavBtnContainer = tw.div`absolute z-10 w-full h-full -left-6 bg-none flex justify-between items-center `;