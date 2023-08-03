import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const PanelPlayerContainer = tw.div`rounded-xl w-full h-auto flex flex-col align-middle justify-center mb-1`;

export const AlbumCoverBox = tw.div` relative flex align-middle max-h-[170px] 2xl:max-h-[200px] bg-cover rounded-xl shadow-xl justify-center self-center bg-white/30 overflow-hidden aspect-square `;

export const AlbumCoverImg = tw.img`aspect-square object-cover  shadow-xl rounded-xl`;

export const Controllers = tw.div` h-10 flex items-center justify-between gap-0 xl:gap-1 relative`;

export const TrackDetails = tw.div`mt-6 flex flex-col gap-2 items-center align-middle justify-center w-full overflow-hidden `;

export const TrackTitle = tw(
  motion.div
)`text-[1.1rem] flex overflow-hidden gap-32 bg-red font-semibold leading-none text-black relative place-self-center mb-1`;

export const Artist = tw.h5`text-sm tracking-tight text-black/90 `;
