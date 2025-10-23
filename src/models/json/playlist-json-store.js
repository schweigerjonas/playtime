import { v4 as uuidv4 } from "uuid";
import { db } from "./store-utils.js";
import { trackJsonStore } from "./track-json-store.js";

export const playlistJsonStore = {
  async getAllPlaylists() {
    await db.read();
    return db.data.playlists;
  },

  async addPlaylist(playlist) {
    await db.read();
    playlist._id = uuidv4();
    db.data.playlists.push(playlist);
    await db.write();
    return playlist;
  },

  async getPlaylistById(id) {
    await db.read();
    let list = db.data.playlists.find((playlist) => playlist._id === id);
    if (list === undefined) {
      list = null;
    } else {
      list.tracks = await trackJsonStore.getTracksByPlaylistId(list._id);
    }
    return list;
  },

  async getUserPlaylists(userId) {
    await db.read();
    let lists = db.data.playlists.filter((playlist) => playlist.userId === userId);
    if (lists === undefined || lists.length === 0) lists = null;
    return lists;
  },

  async deletePlaylistById(id) {
    await db.read();
    const index = db.data.playlists.findIndex((playlist) => playlist._id === id);
    if (index !== -1) db.data.playlists.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaylists() {
    db.data.playlists = [];
    await db.write();
  },
};
