import { Card, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import tw from "tailwind-styled-components";

export const AlbumContainer = tw.div`p-6 pr-12 min-h-fit`;
export const HeaderAlbumInfo = tw.div` text-black absolute grid grid-cols-[1fr_2fr] mt-7`;
export const AlbumDetailsContainer = tw.div`flex flex-col pl-10 justify-center`;
export const AlbumTitle = tw.h1`w-96 text-xl font-bold mb-2 text-stroke `;
export const AlbumDetail = tw.span`text-sm text-black/70 font-semibold`;
export const AlbumBtns = tw.div`flex flex-row mt-10 w-64 justify-between`;

export const AlbumIndex = tw.span`text-sm text-black/70 font-bold`;
export const StyledCard = tw(
  Card
)` hover:cursor-pointer w-full h-14 pt-3 shadow-none bg-white `;

export const StyledHeader = tw(
  CardHeader
)`grid grid-cols-[1.5fr_10fr_5fr_3fr] pt-2`;

export const CardDetails = tw.div`hover:cursor-pointer overflow-hidden  grid grid-cols-[2.4fr_1fr_2fr] gap-2 `;

export const TrackTitle = tw(
  motion.div
)`text-sm w-96 flex overflow-hidden gap-32 bg-red font-semibold leading-none text-default-600 relative  left-3 select-none whitespace-nowrap `;

export const Artist = tw.div`text-sm tracking-tight text-black/50  justify-self-start`;
