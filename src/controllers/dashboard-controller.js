import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  addPlaylist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlist = {
        userId: loggedInUser._id,
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(playlist);
      return h.redirect("/dashboard");
    },
  },
  deletePlaylist: {
    handler: async function (request, h) {
      const { id } = request.params;
      await db.playlistStore.deletePlaylistById(id);
      return h.redirect("/dashboard");
    },
  },
};
