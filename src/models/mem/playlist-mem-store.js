import { v4 as uuidv4 } from "uuid";

let playlists = [];

export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist) {
    playlist._id = uuidv4();
    playlists.push(playlist);
    return playlist;
  },

  async getPlaylistById(id) {
    return playlists.find((playlist) => playlist._id === id);
  },

  async deletePlaylistById(id) {
    const index = playlists.findIndex((playlist) => playlist._id === id);
    return playlists.splice(index, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  },
};
