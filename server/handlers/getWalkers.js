"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getWalkers = async (req, res) => {
const date=req.params.date;
const groupId=req.params.groupId;
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "piadero";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const walkers = await db.collection("walkers").find({ groupId: `${groupId}`}).toArray();
  console.log(walkers+"w")
    // On success/no error, send
    if (walkers) {
        return res
          .status(200)
          .json({ status: 200, walkers: walkers, message: "success" });
      } else {
        // on failure
        return res
          .status(404)
          .json({ status: 404, data: date, message: "no walkers Found" });
      }
    } catch (err) {
      console.log(err.stack);
    } 
    finally {
        client.close();
        console.log("disconnected!");
      }
};

module.exports = {
    getWalkers,
};
