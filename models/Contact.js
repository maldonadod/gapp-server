const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    provider: String,
    id: String
  }
}, {
  collection: 'Contacts'
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = {
  ContactSchema,
  Contact
}