const request = require('request-promise-native')
const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json`
const API_KEY = `AIzaSyBoE93D18AOLYPBSG8bEmAwg4f4eLRRm_k`
const config = {
  json: true
}
const createUrl = query => `${URL}?key=${API_KEY}&query=${query}`

const GooglePlacesApi = query => {
  return request(createUrl(query), config)
}

module.exports = {
  GooglePlacesApi
}