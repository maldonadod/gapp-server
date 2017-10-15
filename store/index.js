const {
  createStore
} = require('redux')

module.exports = (function() {
  
  const rootReducer = require('./reducers')

  const store = createStore(rootReducer)
  
  return store
})()