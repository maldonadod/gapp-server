const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const created_at = {
  type: Date,
  default: Date.now()
}

const Message = new Schema({
  text: String,
  created_at,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Guest = new Schema({
  status: ['go', 'pending', 'no'],
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
})

const Chapter = new Schema({
  date: Date,
  guests: [Guest],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [Message],
  description: String,
  created_at
}, {
  collection: 'Chapters'
})

module.exports = mongoose.model('Chapter', Chapter)
