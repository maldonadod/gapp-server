const SMSAPI = require('smsapicom')
const {dispatch_smsapi_send} = require('../store/dispatch_smsapi_send')
const {dispatch_error} = require('../store/dispatch_error')
const {
  SMSAPI_EMAIL
  ,SMSAPI_PASSWORD
} = process.env
const credentials = {
  username: SMSAPI_EMAIL,
  password: SMSAPI_PASSWORD
}

const smsapi = ({username, password}) => {
  const api = new SMSAPI()
  api
    .authentication
    .login(username, password)
    .catch(dispatch_error)
    
  const send = ({phone_number, message}) => {
    api.message
      .sms()
      .from('Info')
      .to(phone_number)
      .message(message)
      .execute()
      .then(dispatch_smsapi_send)
      .catch(dispatch_error)
  }
    
  return {
    send
  }
}

module.exports = smsapi(credentials)