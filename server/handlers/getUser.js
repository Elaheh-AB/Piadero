"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns a cart
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("piadero");
    console.log("connected!");
    const result = await db.collection("users").findOne({ _id: userId });
    // on success
    if (result) {
      return res
        .status(200)
        .json({ status: 200, data: result, message: "success" });
    } else {
      // on failure
      return res
        .status(404)
        .json({ status: 404, data: userId, message: "user Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getUserById,
};
