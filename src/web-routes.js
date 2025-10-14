import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountController } from "./controllers/account-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountController.index },
  { method: "GET", path: "/signup", config: accountController.showSignup },
  { method: "GET", path: "/login", config: accountController.showLogin },
  { method: "GET", path: "/logout", config: accountController.logout },
  { method: "POST", path: "/register", config: accountController.signup },
  { method: "POST", path: "/authenticate", config: accountController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/playlist", config: dashboardController.addPlaylist },
  { method: "GET", path: "/dashboard/playlist/{id}", config: dashboardController.deletePlaylist },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/playlist/{id}", config: playlistController.index },
  { method: "POST", path: "/playlist/{id}/track", config: playlistController.addTrack },
  { method: "GET", path: "/playlist/{playlistId}/track/{id}", config: playlistController.deleteTrack },
];
