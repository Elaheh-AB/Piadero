"use strict";

const express = require("express");
const morgan = require("morgan");
const PORT = 4000;
const { addUser } = require("./handlers/addUser");
const { getCurrentWeather } = require("./handlers/getCurrentWeather");
const { addGroup } = require("./handlers/addGroup");
const { addMember } = require("./handlers/addMember");
const { getGroups } = require("./handlers/getGroups");
const { getGroupById } = require("./handlers/getGroupById");
const { getUserById } = require("./handlers/getUser");
const { getQoute } = require("./handlers/getQoute");
const { getForcast } = require("./handlers/getForecast");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))
  .post("/add-user", addUser)
  .post("/add-group", addGroup)
  .patch("/add-member", addMember)
  .get("/currentWeather/:city", getCurrentWeather)
  .get("/forecast/:city", getForcast)
  .get("/qoute/:type", getQoute)
  .get("/groups/:userId", getGroups)
  .get("/mygroups/:groupId", getGroupById)
  .get("/users/:userId", getUserById)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
