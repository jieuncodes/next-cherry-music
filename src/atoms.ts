import { atom } from "recoil";
import { Track } from "./lib/server/database.types";

//playlist
export const localStoragePlaylist = atom<Track[]>({
  key: "localStorageState",
  default: [],
});
export const currPlaylistTrackIdx = atom<number>({
  key: "currTrackIdx",
  default: 0,
});

//api
export const topTracksLastFetchTime = atom<Date | null>({
  key: "topTracksLastFetchTime",
  default: null,
});

//player
export const playerReadyStateAtom = atom<boolean>({
  key: "playerReadyState",
  default: false,
});
export const playStateAtom = atom<boolean>({
  key: "playState",
  default: false,
});
export const ShuffleState = atom<boolean>({
  key: "ShuffleState",
  default: false,
});
export const currPlayingTrackYoutubeId = atom<string>({
  key: "currPlayingTrackId",
  default: "",
});

//modals
export const PlaylistModalState = atom<boolean>({
  key: "PlaylistModalState",
  default: false,
});
export const authModalState = atom<boolean>({
  key: "authModalState",
  default: false,
});

//progress bar
export const currTrackCurrentTimeAtom = atom<number>({
  key: "currTrackCurrentTime",
  default: 0,
});
export const currTrackDurationAtom = atom<number>({
  key: "currTrackDuration",
  default: 0,
});
export const progressBarDraggingState = atom<boolean>({
  key: "progressBarDraggingState",
  default: false,
});
