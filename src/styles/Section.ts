import tw from "tailwind-styled-components";

export const RowSection = tw.div`grid grid-cols-[100px_auto]`;
export const ColSection = tw.div`grid grid-rows-[60px_auto] w-full pr-12 mb-20`;
export const SectionContainerMain = tw.div`relative w-full pr-12 `;
export const SectionGridContainer = tw.div`relative w-full mt-12 pr-6 mb-12 grid grid-cols-2 grid-rows-[50px_auto]`;

export const SectionTitleMain = tw.span`font-bold mb-3`;
export const SectionTitle = tw.span`font-bold text-lg row-start-1 col-start-1`;

export const SectionGrid = tw.div`mt-5 overflow-x-scroll grid grid-flow-col grid-rows-4 grid-cols-auto gap-2 snap-mandatory snap-x pr-10 scrollbar-hide`;

export const SectionNav = tw.div`absolute right-10 w-[70px] flex justify-between -top-12 row-start-2 col-start-1`;
export const ShowAllBtn = tw.button`absolute text-xs mt-1 dark:text-white/60 font-semibold cursor-pointer hover:text-cherry`;
