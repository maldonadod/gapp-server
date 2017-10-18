const request = require('request-promise-native')
const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json`
const API_KEY = `AIzaSyBoE93D18AOLYPBSG8bEmAwg4f4eLRRm_k`
const config = {
  json: true
}
const createUrl = query => `${URL}?key=${API_KEY}&query=${query}`

const indian = {
  status: 'OK',
  results: [
    {
      formatted_address: 'La CTM'
      ,geometry: {
        location: {
          latitude: -34,
          longitud: 58
        }
      }
    }
  ]
}

const GooglePlacesApi = query => {
  return request(createUrl(query), config)
  .then(res => {
    console.log(res)
    
    return indian
  })
  .catch(err => {
    
    console.log('Err:', err)
    
    return Promise.resolve(indian)
  })
}

module.exports = {
  GooglePlacesApi
}