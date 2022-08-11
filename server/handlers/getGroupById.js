"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns some of items from start index to the limit

const getGroupById = async (req, res) => {
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
    const group = await db.collection("groups").findOne({ _id:groupId });
  
    // On success/no error, send
    if (group) {
        return res
          .status(200)
          .json({ status: 200, group: group, message: "success" });
      } else {
        // on failure
        return res
          .status(404)
          .json({ status: 404, data: groupId, message: "no group Found" });
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
    getGroupById,
};
