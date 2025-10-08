import { userMemStore } from "./mem/user-mem-store";
import { playlistMemStore } from "./mem/playlist-mem-store";

export const db = {
  userStore: null,
  playlistStore: null,

  init() {
    this.userStore = userMemStore;
    this.playlistStore = playlistMemStore;
  },
};
