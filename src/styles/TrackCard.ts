import tw from "tailwind-styled-components";
import { Card,CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";

export const Buttons = tw.div`absolute right-0`;

export const StyledCard = tw(Card)`w-96 h-16 shadow-none snap-start`;
export const StyledHeader = tw(CardHeader)`"justify-between`;

export const CardDetails = tw.div`flex flex-col gap-1 items-start justify-center w-full overflow-hidden`;

export const TrackTitle = tw(motion.div)`text-sm w-52 flex overflow-hidden gap-32 bg-red font-semibold leading-none text-default-600 relative select-none whitespace-nowrap `;

export const Artist = tw.h5`text-sm tracking-tight text-default-400`;
