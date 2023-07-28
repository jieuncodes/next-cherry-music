import { atom } from "recoil";
import { Track } from "./lib/server/database.types";

export const authModalState = atom<boolean>({
  key: "authModalState",
  default: false,
});

export const localStoragePlaylist = atom<Track[]>({
  key: "localStorageState",
  default: [],
});

export const topTracksLastFetchTime = atom<Date | null>({
  key: "topTracksLastFetchTime",
  default: null,
});

export const currTrackIdxAtom = atom<number>({
  key: "currTrackIdx",
  default: 0,
});
export const playerReadyStateAtom = atom<boolean>({
  key: "playerReadyState",
  default: false,
});
export const playStateAtom = atom<boolean>({
  key: "playState",
  default: false,
});
export const currTrackCurrentTimeAtom = atom<string>({
  key: "currTrackCurrentTime",
  default: "0:00",
});
export const currTrackDurationAtom = atom<string>({
  key: "currTrackDuration",

  default: "0:00",
});
export const PlaylistModalState = atom<boolean>({
  key: "PlaylistModalState",
  default: false,
});
