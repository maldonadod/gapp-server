const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const MessageSchema = new Schema({
  text: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const GuestSchema = new Schema({
  status: {
    type: String,
    enum: ['go', 'pending', 'no'],
    default: 'pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const ChapterSchema = new Schema({
  date: Date,
  guests: [GuestSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [MessageSchema],
  description: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'Chapters'
})

MessageSchema.statics.key_name = 'messages'
GuestSchema.statics.key_name = 'guests'

const Fac = Model => (function(Model) {

  return collection => {
    this[Model.key_name] = collection.map(m => Model(m))
    return this
  }
})(Model)

const Message = mongoose.model('Message', MessageSchema)
const Guest = mongoose.model('Guest', GuestSchema)

ChapterSchema.methods.setMessages = Fac(Message)
ChapterSchema.methods.setGuests = Fac(Guest)

const Chapter = mongoose.model('Chapter', ChapterSchema)

module.exports = {
  Chapter
  ,Message
}