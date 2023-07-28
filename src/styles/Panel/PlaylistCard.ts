import tw from "tailwind-styled-components";
import { Card, CardHeader } from "@nextui-org/card";

export const Buttons = tw.div`absolute right-2`;

export const StyledCard = tw(Card)`hover:cursor-pointer w-full shadow-md h-12 `;
export const StyledHeader = tw(CardHeader)`justify-between `;

export const PlaylistGrid = tw.div` grid grid-cols gap-1 overflow-y-scroll scrollbar-hide`;
