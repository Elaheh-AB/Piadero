"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// updates items in the cart with given id
const updateCart = async (req, res) => {
  const cartId = req.body._id; //cart id
  const itemIds = req.body.itemIds; //array of item ids in cart
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    console.log("cartId", cartId);
    const result = await db
      .collection("cart")
      .updateOne(
        { _id: `${cartId}` },
        { $set: { ...req.body, itemIds: itemIds } }
      );
    // On success/no error, send
    if (result.acknowledged === true && result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, cartId, message: "cart updated successfully" });
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, cartId, message: "can't update the cart" });
    }
  } catch (err) {
    console.log(err.stack);
    return res
      .status(404)
      .json({ status: 404, cartId, message: "can't update the cart" });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  updateCart,
};
