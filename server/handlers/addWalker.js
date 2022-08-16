"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { getWalkers } = require("./getWalkers");

// add new user to db
const addWalker = async (req, res) => {
  const walkerName = req.body.walkerName; //walker name
  const groupId = req.body.groupId; //group id
  const date = req.body.date; //walking time and date
  console.log(Object.values(date) + "date");
  const walkerId = req.body.walkerId; //user id in Auth0

  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "piadero";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");

    const result = await db.collection("walkers").updateOne(
      { date: `${date}`, groupId: `${groupId}` },
      {
        $addToSet: { walkers: { walkerName: walkerName, walkerId: walkerId } },
        $setOnInsert: { groupId, date, _id: uuidv4() },
      },
      { upsert: true }
    );

    // On success/no error, send
    if (result.acknowledged) {
      //send back id to store in local storage
      return res.status(201).json({
        status: 201,
        message: "walker added",
        walkId: result.insertedId,
      });
    } else {
      // on failure/error, send
      return res.status(404).json({ status: 404, message: "can't add walker" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  addWalker,
};
