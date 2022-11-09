"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const compression = require("compression");
const PORT =  process.env.PORT || 8000;
const { addUser } = require("./handlers/addUser");
const { getCurrentWeather } = require("./handlers/getCurrentWeather");
const { addGroup } = require("./handlers/addGroup");
const { addMember } = require("./handlers/addMember");
const { getGroups } = require("./handlers/getGroups");
const { getGroupById } = require("./handlers/getGroupById");
const { getUserById } = require("./handlers/getUser");
const { getQoute } = require("./handlers/getQoute");
const { getForcast } = require("./handlers/getForecast");
const { addWalker } = require("./handlers/addWalker");
const { getWalkers } = require("./handlers/getWalkers");

const app = express();
app.use(compression());
app.use((req, res, next) => {  
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );  
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
// Content Security Policy (CSP)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// https://helmetjs.github.io/
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.static("./server/assets"));
// Set limit to 25mb to send images
// https://reactgo.com/request-entity-too-large-node/
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false, limit: "25mb" }));
if (process.env.NODE_ENV === "developement") {
  app.use("/", express.static(__dirname + "/"));
}

  // REST endpoints?
  app.get("/bacon", (req, res) => res.status(200).json("🥓"))
  app.post("/add-user", addUser)
  app.post("/add-walker", addWalker)
  app.post("/add-group", addGroup)
  app.patch("/add-member", addMember)
  app.get("/currentWeather/:city", getCurrentWeather)
  app .get("/forecast/:city", getForcast)
  app.get("/qoute/:type", getQoute)
  app.get("/groups/:userId", getGroups)
  app .get("/walkers/:groupId", getWalkers)
  app.get("/mygroups/:groupId", getGroupById)
  app.get("/users/:userId", getUserById)
  // The section below is to serve React on heroku server
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, "../client/build")));
   // Handle React routing, return all requests to React app  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  }

  app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
