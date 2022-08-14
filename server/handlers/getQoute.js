"use strict";
const e = require("express");


// returns a cart
const getQoute = async (req, res) => {
    const type = req.params.type;
  // creates a new client
  const request = require("request-promise");
  try {
   
    const result = await request(
        `https://zenquotes.io/api/${type}`
      )
      console.log(result+"resu")
    // on success
    if (result) {
      return res
        .status(200)
        .json({ status: 200,qoute: JSON.parse(result), message: "success" });
    } else {
      // on failure
      return res
        .status(404)
        .json({ status: 404, data: city, message: "no qoute Found" });
    }
  } catch (err) {
    console.log(err.stack);
  } 
};

module.exports = {
    getQoute,
};
