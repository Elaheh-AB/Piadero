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
const addMember = async (req, res) => {
  const memberSub = req.body.sub; //user id in Auth0
  const groupId = req.body.groupId; //group id
  const picture=req.body.picture;
  const name=req.body.name;

  console.log(memberSub+"memberSub");
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
      .collection("groups")
      .updateOne(
        { _id: `${groupId}` },
        { $addToSet: {"members":{user:memberSub,isAdmin:true,picture:picture,name:name}}} )

    // On success/no error, send
    if (result.acknowledged === true && result.modifiedCount === 1) {
      //send back id to store in local storage
      return res.status(201).json({
        status: 201,
        message: "member added",
        groupId: groupId,
       
      });
    } else {
      // on failure/error, send
      if(result.acknowledged === true && result.matchedCount === 1){
        return res.status(404).json({ status: 404,result, message: "member already exists" });
      }else{
        return res.status(404).json({ status: 404,result, message: "can't add member" });
      }
     
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  addMember,
};
