const gcm = require('node-gcm');
const API_KEY = process.env.GCM_API_KEY

const sender = new gcm.Sender(API_KEY)

const MessageFactory = data => new gcm.Message({ data })

const send = message => sender.send(MessageFactory(message), { registrationTokens })

module.exports = {
  send
}
