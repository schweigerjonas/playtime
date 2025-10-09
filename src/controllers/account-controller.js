import { db } from "../models/db.js";

export const accountController = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Playtime" });
    },
  },
  showSignup: {
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Playtime" });
    },
  },
  signup: {
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Playtime" });
    },
  },
  login: {
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      return h.redirect("/");
    },
  },
};
