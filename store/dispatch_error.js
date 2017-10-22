const {error_action} = require('./actions/error')
const store = require('./index')
const dispatch_error = error => {
  store.dispatch(error_action(error))
}
module.exports = {
  dispatch_error
}