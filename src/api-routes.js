import { userApi } from "./api/user-api.js";
import { playlistApi } from "./api/playlist-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/user", config: userApi.find },
  { method: "GET", path: "/api/user/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/user", config: userApi.create },
  { method: "DELETE", path: "/api/user", config: userApi.deleteAll },

  { method: "GET", path: "/api/playlist", config: playlistApi.find },
  { method: "GET", path: "/api/playlist/{id}", config: playlistApi.findOne },
  { method: "POST", path: "/api/playlist", config: playlistApi.create },
  { method: "DELETE", path: "/api/playlist", config: playlistApi.deleteAll },
];
