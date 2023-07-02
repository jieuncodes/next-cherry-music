import tw from "tailwind-styled-components";
import { Card,CardHeader } from "@nextui-org/card";

export const Buttons = tw.div`absolute right-0`;

export const StyledCard = tw(Card)`w-96 h-16 shadow-none snap-start`;
export const StyledHeader = tw(CardHeader)`"justify-between`;

export const CardDetails = tw.div`flex flex-col gap-1 items-start justify-center`;
export const TrackTitle = tw.h4`text-sm font-semibold leading-none text-default-600`;
export const Artist = tw.h5`text-sm tracking-tight text-default-400`;