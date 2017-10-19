const {
  combineReducers
} = require('redux')

const app = require('./app')
const errors = require('./error')

module.exports = combineReducers({
  app
  ,errors
})