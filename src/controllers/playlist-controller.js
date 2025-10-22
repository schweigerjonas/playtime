import { db } from "../models/db.js";
import { TrackSpec } from "../models/joi-schemas.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      const { id } = request.params;
      const playlist = await db.playlistStore.getPlaylistById(id);
      const viewData = {
        title: await playlist.title,
        playlist: playlist,
      };
      return h.view("playlist-view", viewData);
    },
  },
  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("playlist-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { id } = request.params;
      const track = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: request.payload.duration,
      };
      const playlist = await db.playlistStore.getPlaylistById(id);
      await db.trackStore.addTrack(playlist._id, track);
      return h.redirect(`/playlist/${id}`);
    },
  },
  deleteTrack: {
    handler: async function (request, h) {
      const { playlistId, id } = request.params;
      await db.trackStore.deleteTrackById(id);
      return h.redirect(`/playlist/${playlistId}`);
    },
  },
};
