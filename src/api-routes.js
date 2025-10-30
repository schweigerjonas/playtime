import { userApi } from "./api/user-api.js";
import { playlistApi } from "./api/playlist-api.js";
import { trackApi } from "./api/track-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/user", config: userApi.find },
  { method: "GET", path: "/api/user/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/user", config: userApi.create },
  { method: "DELETE", path: "/api/user", config: userApi.deleteAll },

  { method: "GET", path: "/api/playlist", config: playlistApi.find },
  { method: "GET", path: "/api/playlist/{id}", config: playlistApi.findOne },
  { method: "POST", path: "/api/playlist", config: playlistApi.create },
  { method: "DELETE", path: "/api/playlist", config: playlistApi.deleteAll },
  { method: "DELETE", path: "/api/playlist/{id}", config: playlistApi.deleteOne },

  { method: "GET", path: "/api/track", config: trackApi.find },
  { method: "GET", path: "/api/track/{id}", config: trackApi.findOne },
  { method: "POST", path: "/api/playlist/{id}/track", config: trackApi.create },
  { method: "DELETE", path: "/api/track", config: trackApi.deleteAll },
  { method: "DELETE", path: "/api/track/{id}", config: trackApi.deleteOne },
];
