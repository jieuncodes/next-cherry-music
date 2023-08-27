import { Track } from "@/lib/server/database.types";

export interface DropdownItemData {
  key: string;
  label: string;
  icon: JSX.Element;
}
export interface arrWithType {
  type: string;
  items: any[];
}
export interface ItemProps {
  name: string;
  artist?: { name: string };
}
export interface TrackArrayWithType {
  type: string;
  items: Track[];
}

export interface CherryTrack {
  key: string;
  rank: number;
  trackTitle: string;
  artist: string;
  youtubeId: string | null;
  albumTitle: string;
  albumImgUrl: string;
  tags: { name: string; url: string }[];
  playCount: string;
  wiki: { published: string; summary: string };
}
