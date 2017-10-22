const {log_info} = require('./actions/log_info')
const store = require('./index')

const dispatch_smsapi_send = info => {
  store.dispatch(log_info(info))
}

module.exports = {
  dispatch_smsapi_send
}