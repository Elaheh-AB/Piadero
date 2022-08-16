"use strict";
const e = require("express");


// returns a cart
const getCurrentWeather = async (req, res) => {
  const city = req.params.city;
  // creates a new client
  const request = require("request-promise");
  try {
    const key = process.env.OPEN_WEATHER_API_KEY;
    const q = `${city}`;
    const result = await request(
        `https://api.openweathermap.org/data/2.5/weather?q=${q},ca&units=metric&appid=${key}`
      )
     // console.log(result+"res:")
    // on success
    if (result) {
      return res
        .status(200)
        .json({ status: 200, feels_like: JSON.parse(result).main.feels_like, message: "success" });
    } else {
      // on failure
      return res
        .status(404)
        .json({ status: 404, data: city, message: "no info Found" });
    }
  } catch (err) {
    console.log(err.stack);
  } 
};

module.exports = {
    getCurrentWeather,
};
