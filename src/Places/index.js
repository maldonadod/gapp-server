const {
  PromiseHandler
} = require('../../responses/PromiseHandler')

const {
  GooglePlacesApi  
} = require('./GoogleApi')

const {
  queryPlacesFrom
} = require('./business')

const getPlacesPromise = req => {
  
  const {
    query
  } = req
  
  const placeApi = queryPlacesFrom(GooglePlacesApi)
  
  return placeApi(query.query)
}

const get = PromiseHandler(getPlacesPromise)

module.exports = {
  get
}