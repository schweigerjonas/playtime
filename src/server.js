import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import Joi from "joi";
import hapiswagger from "hapi-swagger";
import path from "path";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountController } from "./controllers/account-controller.js";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  info: {
    title: "Playtime API",
    version: "0.1",
  },
};

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register([
    Inert,
    Vision,
    {
      plugin: hapiswagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountController.validate,
  });
  server.auth.default("session"); // option name equals name of defined strategy
  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on port %s.", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
