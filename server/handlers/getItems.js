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

const getItems = async (req, res) => {
  const start = parseInt(req.query.start);
  const limit = parseInt(req.query.limit);

  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const items = await db.collection("items").find().toArray();
    const maxLength = items.length;
    // On success/no error, send
    if (items) {
        //checking if one of the start or limit is provided
      if (start || limit) {
        if (start && limit) {
            //checking if start and limit are in range of items not greater than the number of items
          if (start >= maxLength || start + limit > maxLength) {
            const sliceLimit = start >= maxLength ? start - maxLength : limit;

            const sliceStart =
              start + limit > maxLength ? maxLength - sliceLimit : start;

            const data = items.slice(sliceStart, sliceLimit);

            res.status(200).json({
              status: 200,
              start: sliceStart,
              limit: sliceLimit,
              data: data,
            });
          } else {
            res.status(200).json({
              status: 200,
              data: items.slice(start, start + limit),
            });
          }
          //checking if there is no limit set start in range
        } else if (start && !limit) {
          const sliceStart = start < maxLength ? start : 0;
          res
            .status(200)
            .json({
              status: 200,
              start: sliceStart,
              data: items.slice(sliceStart),
            });
            //checking if there is no start set it to 0 and check limit to be in range
        } else if (!start && limit) {
          const sliceLimit = limit < maxLength ? limit : maxLength;
          res
            .status(200)
            .json({
              status: 200,
              limit: sliceLimit,
              start:0,
              data: items.slice(0, sliceLimit),
            });
        }
        //it returns all of the data if there is no start and limit
      } else {
        res.status(200).json({ status: 200, data: items });
      }
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, message: "can't find any item" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getItems,
};
