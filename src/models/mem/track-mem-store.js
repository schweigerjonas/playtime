import { v4 as uuidv4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async addTrack(track, playlistId) {
    track._id = uuidv4;
    track.playlistId = playlistId;
    tracks.push(track);
    return track;
  },

  async getAllTracks() {
    return tracks;
  },

  async getTrackById(id) {
    return tracks.find((track) => track._id === id);
  },

  async getTracksByPlaylistId(playlistId) {
    return tracks.filter((track) => track.playlistId === playlistId);
  },

  async updateTrackById(newTrack, id) {
    const track = tracks.find((t) => t._id === id);
    track.title = newTrack.title;
    track.artist = newTrack.artist;
    track.duration = newTrack.duration;
    return track;
  },

  async deleteTrackById(id) {
    const index = tracks.findIndex((track) => track._id === id);
    return tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },
};
