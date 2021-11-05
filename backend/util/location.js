const axios = require("axios")

const HttpError = require("../models/http-error")

const API_KEY = "AIzaSyCepT_89Z9LVc7KJ95LgjqLe6fFYhQ1BTk"

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516,
  // }
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  )

  const data = response.data

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    )
    throw error
  }
  console.log(data)
  const coordinates = data.results[0].geometry.location

  return coordinates
}

module.exports = getCoordsForAddress
