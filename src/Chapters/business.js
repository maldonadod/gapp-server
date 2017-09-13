const {
  Chapter
} = require('../../models/Chapter')

const user_unselected_fields = '-__v -authentication.access_token -password'

const author = {
  path: 'author',
  select: user_unselected_fields
}

const guests = {
  path: 'guests.user',
  select: user_unselected_fields
}

const message_author = {
  path: 'messages.author',
  select: user_unselected_fields
}

const unselected_fields = '-__v'

const get = (params = {}) => {
  return Chapter.find(params, unselected_fields)
  .populate(author)
  .populate(message_author)
  .populate(guests)
}

const getOne = (params = {}) => {
  return Chapter.findOne(params, unselected_fields)
  .populate(author)
  .populate(message_author)
  .populate(guests)
}

const post = input => {
  const chapter = new Chapter(input)

  chapter.setMessages(input.messages)
  chapter.setGuests(input.guests)

  return chapter.save().then(() => {
    return getOne({
      _id: chapter._id
    })
  })
}

module.exports = {
  get
  ,post
}
