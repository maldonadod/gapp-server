const FCM = require('fcm-push');
const API_KEY = process.env.GCM_API_KEY

const sender = new FCM(API_KEY)

const message_factory = ({to,collapse_key,data,notification}) => ({
  to,
  collapse_key,
  data,
  notification
})

const send = (message, regids) => sender.send(message_factory({data: message, to: regids}))

module.exports = {
  send
}
