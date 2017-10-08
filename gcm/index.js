const FCM = require('fcm-push');
const API_KEY = process.env.GCM_API_KEY

const sender = new FCM(API_KEY)

const message_factory = ({to,collapse_key,data,notification}) => ({
  to,
  collapse_key, 
  notification
})

const send = (message, registrationTokens) => sender.send(message_factory(message))

module.exports = {
  send
}
