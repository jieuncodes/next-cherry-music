import { Card, CardHeader } from "@nextui-org/react";
import tw from "tailwind-styled-components";

export const PlaylistGrid = tw.div` grid grid-cols gap-1 overflow-y-scroll scrollbar-hide`;

export const StyledCard = tw(Card)`hover:cursor-pointer w-full shadow-md h-12 `;
export const StyledHeader = tw(CardHeader)`justify-between `;
