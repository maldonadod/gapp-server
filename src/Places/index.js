const {
  handlerPromise
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

const get = handlerPromise(getPlacesPromise)

module.exports = {
  get
}