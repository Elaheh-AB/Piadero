"use strict";
const e = require("express");


// returns a cart
const getForcast = async (req, res) => {
  const city = req.params.city;
  let calendar=[];
  // creates a new client
  const request = require("request-promise");
  try {
    const key = process.env.OPEN_WEATHER_API_KEY;
    const q = `${city}`;
    const result = await request(
        `https://api.openweathermap.org/data/2.5/forecast?q=${q},ca&units=metric&appid=${key}`
      )
      console.log(result+"res:")
    // on success
    if (result) {
       JSON.parse(result).list.map((time)=>{
        calendar.push({time:time.dt_txt,temp:time.main.feels_like,selected:"false",members:[]});

        })
        console.log(calendar);
      return res
        .status(200)
        .json({ status: 200,cnt:JSON.parse(result).cnt,forecast:calendar, message: "success" });
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
    getForcast,
};
