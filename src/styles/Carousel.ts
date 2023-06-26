import tw from "tailwind-styled-components";
import { motion } from "framer-motion";
export const CarouselContainer = tw.div`relative`;
export const CarouselBox = tw(
  motion.div
)`absolute bg-gradient-to-r from-pink-100 from-10% via-white via-50% to-indigo-100 to-90% h-80 w-full -ml-6 -mt-6 overflow-hidden flex flex-col p-10 pl-16 justify-center xl:p-20`;

export const CarouselImg = tw.img`object-contain h-full drop-shadow-md place-self-end absolute mt-10`;

export const Title = tw.span`font-extrabold text-4xl mb-5`;
export const Description = tw.p`w-72 mb-10`;
export const Buttons = tw.div`w-1/4 flex justify-between`;
export const NavBtnContainer = tw.div`absolute z-10 w-full h-full bg-red-400 flex justify-between items-center pr-6 -ml-4 -mr-4 top-1/2`;
