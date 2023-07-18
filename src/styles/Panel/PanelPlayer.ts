import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const PanelPlayerContainer = tw.div`rounded-xl w-full h-auto flex flex-col align-middle p-6`;

export const AlbumCoverBox = tw.div` relative flex align-middle  rounded-xl shadow-xl justify-center self-center bg-white overflow-hidden aspect-square `;

export const AlbumCoverImg = tw.img`aspect-square object-cover max-h-[180px] 2xl:max-h-[200px] shadow-xl rounded-xl`;

export const Controllers = tw.div`w-full h-10 mt-5 flex items-center justify-between gap-1`;

export const TrackDetails = tw.div`mt-6 flex flex-col gap-2 items-center align-middle justify-center w-full overflow-hidden `;

export const TrackTitle = tw(
  motion.div
)`text-sm w-36 flex overflow-hidden gap-32 bg-red font-semibold leading-none text-default-600 relative select-none whitespace-nowrap`;

export const Artist = tw.h5`text-sm tracking-tight text-default-400 `;
