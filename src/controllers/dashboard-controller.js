import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const playlists = await db.playlistStore.getAllPlaylists();
      const viewData = {
        title: "Playtime Dashboard",
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  about: {
    handler: function (request, h) {
      return h.view("about-view", { title: "About Playtime" });
    },
  },
  addPlaylist: {
    handler: async function (request, h) {
      const playlist = {
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(playlist);
      return h.redirect("/dashboard");
    },
  },
};
