import { Tag } from "./lastFmTypes";

export interface DropdownItemData {
  key: string;
  label: string;
  icon: JSX.Element;
}
export interface ArrWithType<T> {
  type: string;
  items: T[];
}
export interface SliderItemProps {
  name: string;
  artist?: { name: string };
}

export interface CherryTrack {
  key?: string;
  rank: number;
  trackTitle: string;
  artist: string;
  youtubeId: string | null;
  albumTitle: string;
  albumImgUrl: string;
  tags?: Tag[];
  playCount?: string;
  wiki?: { published: string; summary: string };
}

export type QueryTypes = "top" | "koreatop" | "ustop" | "colombiatop";
