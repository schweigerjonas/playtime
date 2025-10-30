import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, TrackArray, TrackSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const trackApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const track = await db.trackStore.addTrack(request.params.id, request.payload);
        if (track) {
          return h.response(track).code(201);
        }
        return Boom.badImplementation("error creating track");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a track",
    notes: "Returns the newly created track",
    response: { schema: TrackSpec, failAction: validationError },
    validate: { payload: TrackSpec, failAction: validationError },
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const tracks = await db.trackStore.getAllTracks();
        return tracks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all tracks",
    notes: "Returns details of all tracks",
    response: { schema: TrackArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const track = await db.trackStore.getTrackById(request.params.id);
        if (!track) {
          return Boom.notFound("No track with this id");
        }
        return track;
      } catch (err) {
        return Boom.serverUnavailable("No track with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific track",
    notes: "Returns track details",
    response: { schema: TrackSpec, failAction: validationError },
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trackStore.deleteAllTracks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all tracks",
    notes: "Removes all tracks from Playtime",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const track = await db.trackStore.getTrackById(request.params.id);
        if (!track) {
          return Boom.notFound("No track with this id");
        }
        await db.trackStore.deleteTrack(track._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No track with this id");
      }
    },
    tags: ["api"],
    description: "Delete a specific track",
    notes: "Removes a specific track",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
