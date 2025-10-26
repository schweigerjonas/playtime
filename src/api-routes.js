import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/user", config: userApi.find },
  { method: "GET", path: "/api/user/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/user", config: userApi.create },
  { method: "DELETE", path: "/api/user", config: userApi.deleteAll },
];
