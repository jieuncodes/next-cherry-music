import tw from "tailwind-styled-components";

export const RowSection = tw.div`grid grid-cols-[100px_auto]`;

export const SectionContainerMain = tw.div`relative w-full pr-12 `;
export const SectionContainer = tw.div`relative w-full mt-6 pr-6 `;

export const SectionTitleMain = tw.span`font-bold mb-3`;
export const SectionTitle = tw.span`font-bold text-lg`;

export const SectionGridMain = tw.div`mt-5 overflow-x-scroll grid grid-flow-col grid-rows-4 grid-cols-auto gap-2 snap-mandatory snap-x pr-10 scrollbar-hide`;
export const SectionGrid = tw.div`overflow-x-scroll grid grid-flow-col grid-rows-4 grid-cols-auto gap-2 snap-mandatory snap-x pr-10 scrollbar-hide`;

export const SectionNav = tw.div`absolute right-10 w-[70px] flex justify-between top-0`;
export const ShowAllBtn = tw.button`absolute text-xs mt-1 dark:text-white/60 font-semibold cursor-pointer hover:text-cherry`;
