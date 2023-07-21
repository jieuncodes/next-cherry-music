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
