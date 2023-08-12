import tw from "tailwind-styled-components";
import { Card, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";

export const Buttons = tw.div`absolute right-2 top-3 z-30`;

export const StyledCard = tw(
  Card
)` hover:cursor-pointer w-full h-12 shadow-none `;
export const StyledHeader = tw(
  CardHeader
)`grid grid-cols-[1.5fr_15fr_3fr] pt-2`;
export const CardDetails = tw.div`hover:cursor-pointer overflow-hidden  grid grid-cols-[2.4fr_1fr_2fr] gap-2 `;

export const TrackTitle = tw(
  motion.div
)`text-sm w-36 flex overflow-hidden gap-32 bg-red font-semibold leading-none text-default-600 relative  left-3 select-none whitespace-nowrap `;

export const Artist = tw.div`text-sm tracking-tight text-black/50  justify-self-start`;
export const AlbumTitle = tw.div`z-30 box-border flex items-center text-sm tracking-tight text-black/50 whitespace-nowrap overflow-hidden justify-self-start w-full`;
