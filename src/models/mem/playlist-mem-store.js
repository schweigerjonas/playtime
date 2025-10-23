import { v4 as uuidv4 } from "uuid";
import { trackMemStore } from "./track-mem-store.js";

let playlists = [];

export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist) {
    playlist._id = uuidv4();
    playlist.tracks = [];
    playlists.push(playlist);
    return playlist;
  },

  async getPlaylistById(id) {
    let playlist = playlists.find((p) => p._id === id);
    if (playlist === undefined) {
      playlist = null;
    } else {
      playlist.tracks = await trackMemStore.getTracksByPlaylistId(playlist._id);
    }
    return playlist;
  },

  async getUserPlaylists(userId) {
    let lists = playlists.filter((playlist) => playlist.userId === userId);
    if (lists === undefined || lists.length === 0) lists = null;
    return lists;
  },

  async deletePlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    if (index !== -1) playlists.splice(index, 1);
    return playlists;
  },

  async deleteAllPlaylists() {
    playlists = [];
  },
};
