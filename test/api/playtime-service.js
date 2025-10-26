import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/user`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/user/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/user`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/user`);
    return res.data;
  },

  async createPlaylist(playlist) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlist`, playlist);
    return res.data;
  },

  async getPlaylist(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/playlist/${id}`);
    return res.data;
  },

  async getAllPlaylists() {
    const res = await axios.get(`${this.playtimeUrl}/api/playlist`);
    return res.data;
  },

  async deleteAllPlaylists() {
    const res = await axios.delete(`${this.playtimeUrl}/api/playlist`);
    return res.data;
  },
};
