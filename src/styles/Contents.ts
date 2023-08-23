import tw from "tailwind-styled-components";

export const ContentsContainer = tw.div`relative flex flex-col justify-between bg-zinc-100 w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-hide rounded-[15px] lg:rounded-r-none 
`;

export const Contents = tw.div`absolute w-full h-full box-border m-6 `;
export const MainContainer = tw.main`
  flex flex-col h-screen`;
