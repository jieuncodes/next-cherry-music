import { Tag } from "./lastFmTypes";

export interface DropdownItemData {
  key: string;
  label: string;
  icon: JSX.Element;
}
export interface arrWithType {
  type: string;
  items: any[];
}
export interface SliderItemProps {
  name: string;
  artist?: { name: string };
}
export interface TrackArrayWithType {
  type: string;
  items: CherryTrack[];
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
