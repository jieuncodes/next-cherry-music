import tw from "tailwind-styled-components";
import { Card, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";

export const Buttons = tw.div`absolute right-2 top-3 z-30`;

export const StyledCard = tw(
  Card
)` hover:cursor-pointer w-80 h-16 shadow-none snap-start`;
export const StyledHeader = tw(CardHeader)`justify-between`;

export const TrackImgBox = tw.div`relative flex`;
export const CardDetails = tw.div`hover:cursor-pointer flex flex-col gap-1 items-start justify-center w-full overflow-hidden pl-5`;

export const TrackTitle = tw(
  motion.div
)`text-sm w-36 flex overflow-hidden gap-32 bg-red font-semibold leading-none text-default-600 relative select-none whitespace-nowrap`;

export const Artist = tw.h5`text-sm tracking-tight text-black/50`;
