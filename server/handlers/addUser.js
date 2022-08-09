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

// add new user to db
const addUser = async (req, res) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const nickname = req.body.nickname;
  const subuser=req.body.sub;//user id in Auth0
  const emailVerified=req.body.email_verified;
  const picture=req.body.picture;
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "piadero";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const result = await db
      .collection("users")
      .updateOne({ _id:subuser},{$setOnInsert:{ name,nickname, email,emailVerified,picture, _id:subuser} },{upsert:true});

    // On success/no error, send
    if (result.acknowledged) {
      //send back id to store in local storage
      return res.status(201).json({
        status: 201,
        message: "user added",
        userId: result.insertedId,
      });
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, message: "can't add user" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  addUser,
};
