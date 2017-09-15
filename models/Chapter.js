const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const mongoosePaginate = require('mongoose-paginate')

const GUESTS_PENDING_STATUS = 'pending'
const GUESTS_OK_STATUS = 'ok'
const GUESTS_NOT_STATUS = 'not'

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
    enum: [GUESTS_OK_STATUS, GUESTS_PENDING_STATUS, GUESTS_NOT_STATUS],
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

ChapterSchema.plugin(mongoosePaginate)

const Message = mongoose.model('Message', MessageSchema)
const Guest = mongoose.model('Guest', GuestSchema)

ChapterSchema.methods.setMessages = Fac(Message)
ChapterSchema.methods.setGuests = Fac(Guest)

const Chapter = mongoose.model('Chapter', ChapterSchema)

module.exports = {
  Chapter
  ,Message
  ,GUESTS_OK_STATUS
  ,GUESTS_PENDING_STATUS
  ,GUESTS_NOT_STATUS
}
