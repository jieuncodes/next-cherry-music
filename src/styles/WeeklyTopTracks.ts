import tw from "tailwind-styled-components";

export const SectionContainer = tw.div`container absolute `;
export const SectionTitle = tw.span`font-bold`;
export const SectionGrid = tw.div`mt-5 overflow-x-scroll grid grid-flow-col grid-rows-4 grid-cols-auto gap-2 snap-mandatory snap-x pr-10 scrollbar-hide`;

export const SectionNav = tw.div`absolute right-10 mt-1 w-14 flex justify-between`;
