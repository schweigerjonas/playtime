import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaylistArray, PlaylistSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const playlistApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.addPlaylist(request.payload);
        if (playlist) {
          return h.response(playlist).code(201);
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a playlist",
    notes: "Returns newly created playlist",
    response: { schema: PlaylistSpec, failAction: validationError },
    validate: { payload: PlaylistSpec, failAction: validationError },
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlists = await db.playlistStore.getAllPlaylists();
        return playlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all playlists",
    notes: "Returns details of all playlists",
    response: { schema: PlaylistArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No playlist with this id");
        }
        return playlist;
      } catch (err) {
        return Boom.serverUnavailable("No playlist with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific playlist",
    notes: "Returns playlist details",
    response: { schema: PlaylistSpec, failAction: validationError },
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.playlistStore.deleteAllPlaylists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all playlists",
    notes: "Removes all playlists from Playtime",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const playlist = await db.playlistStore.getPlaylistById(request.params.id);
        if (!playlist) {
          return Boom.notFound("No playlist with this id");
        }
        await db.playlistStore.deletePlaylistById(playlist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No playlist with this id");
      }
    },
    tags: ["api"],
    description: "Delete a specific playlist",
    notes: "Removes a specific playlist",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
