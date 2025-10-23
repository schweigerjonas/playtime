import { v4 as uuidv4 } from "uuid";

let tracks = [];

export const trackMemStore = {
  async addTrack(playlistId, track) {
    track._id = uuidv4();
    track.playlistId = playlistId;
    tracks.push(track);
    return track;
  },

  async getAllTracks() {
    return tracks;
  },

  async getTrackById(id) {
    let foundTrack = tracks.find((track) => track._id === id);
    if (foundTrack === undefined) foundTrack = null;
    return foundTrack;
  },

  async getTracksByPlaylistId(playlistId) {
    let foundTracks = tracks.filter((track) => track.playlistId === playlistId);
    if (foundTracks === undefined) foundTracks = null;
    return foundTracks;
  },

  async updateTrackById(newTrack, id) {
    const track = tracks.find((t) => t._id === id);
    track.title = newTrack.title;
    track.artist = newTrack.artist;
    track.duration = newTrack.duration;
    return track;
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((track) => track._id === id);
    if (index !== -1) tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },
};
