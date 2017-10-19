const {
  createStore
} = require('redux')

const ErrorHandler = require('../error_handler')

module.exports = (function() {
  
  const rootReducer = require('./reducers')

  const store = createStore(rootReducer)
  
  ErrorHandler.subscribe_to(store)
  
  return store
})()