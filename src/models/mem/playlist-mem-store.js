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
    const playlist = playlists.find((p) => p._id === id);
    playlist.tracks = await trackMemStore.getTracksByPlaylistId(playlist._id);
    return playlist;
  },

  async deletePlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    return playlists.splice(index, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  },
};
