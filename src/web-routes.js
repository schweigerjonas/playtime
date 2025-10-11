import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountController } from "./controllers/account-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountController.index },
  { method: "GET", path: "/signup", config: accountController.showSignup },
  { method: "GET", path: "/login", config: accountController.showLogin },
  { method: "GET", path: "/logout", config: accountController.logout },
  { method: "POST", path: "/register", config: accountController.signup },
  { method: "POST", path: "/authenticate", config: accountController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/about", config: dashboardController.about },
  { method: "POST", path: "/dashboard/playlist", config: dashboardController.addPlaylist },

  { method: "GET", path: "/playlist/{id}", config: playlistController.index },
  { method: "POST", path: "/playlist/{id}/track", config: playlistController.addTrack },
];
