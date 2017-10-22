const {
  combineReducers
} = require('redux')

const app = require('./app')
const errors = require('./error')
const log_info = require('./log_info')

module.exports = combineReducers({
  app
  ,errors
  ,log_info
})