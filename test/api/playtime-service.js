import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  // User API methods
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

  // Playlist API methods
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

  // Track API tests
  async createTrack(playlistId, track) {
    const res = await axios.post(`${this.playtimeUrl}/api/track`, { playlistId, track });
    return res.data;
  },

  async getTrack(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/track/${id}`);
    return res.data;
  },

  async getAllTracks() {
    const res = await axios.get(`${this.playtimeUrl}/api/track`);
    return res.data;
  },

  async deleteAllTracks() {
    const res = await axios.delete(`${this.playtimeUrl}/api/track`);
    return res.data;
  },
};
