import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
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
        duration: Number(request.payload.duration),
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
  uploadImage: {
    handler: async function (request, h) {
      let playlist = {};
      try {
        playlist = await db.playlistStore.getPlaylistById(request.params.id);
        const file = request.payload.imageFile;
        if (Object.keys(file).length > 0) {
          const img = await imageStore.uploadImage(file);
          playlist.img = img;
          await db.playlistStore.updatePlaylist(playlist);
        }
        return h.redirect(`/playlist/${playlist._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/playlist/${playlist._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  deleteImage: {
    handler: async function (request, h) {
      let playlist = {};
      try {
        playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist.img) {
          return h.redirect(`/playlist/${playlist._id}`);
        }
        await imageStore.deleteImage(playlist.img.publicId);
        playlist.img = null;
        await db.playlistStore.updatePlaylist(playlist);
        return h.redirect(`/playlist/${playlist._id}`);
      } catch (err) {
        return h.redirect(`/playlist/${playlist._id}`);
      }
    },
  },
};
