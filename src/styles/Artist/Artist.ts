import { styled } from "styled-components";
import tw from "tailwind-styled-components";

export const HeaderImg = tw.div`absolute -top-6 -left-6 w-full h-[400px] bg-cover bg-center bg-no-repeat filter overflow-hidden`;

export const BlurredGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(244, 244, 245, 0.8) 90%,
    rgba(244, 244, 245, 1) 100%
  );
`;

export const ArtistInfo = tw.div`absolute z-10 text-black top-56 px-6`;
export const ArtistInfoHeader = tw.div`flex flex-col justify-between w-full pr-12`;
export const ArtistNameArea = tw.div`flex flex-row   max-w-[calc(70%-10px)]
`;
export const ArtistName = tw.h1`text-3xl font-bold mb-6`;
export const ArtistDesc = tw.div`w-full h-20 pr-6 mb-3`;
export const Desc = tw.p`hidden lg:block h-20 pr-6 whitespace-normal overflow-hidden`;

export const Buttons = tw.div`flex flex-row w-36 justify-between `;
export const PlayAllBtn = tw.button``;

export const Tiles = tw.div`relative top-6 grid w-full overflow-x-scroll scrollbar-hide grid-flow-col whitespace-nowrap  `;
export const Hashtags = tw.div``;
