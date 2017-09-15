const {
  Chapter
} = require('../../models/Chapter')

const User = require('../../models/User')

const author = {
  path: 'author',
  select: User.USER_UNSELECTED_FIELDS
}

const guests = {
  path: 'guests.user',
  select: User.USER_UNSELECTED_FIELDS
}

const message_author = {
  path: 'messages.author',
  select: User.USER_UNSELECTED_FIELDS
}

const unselected_fields = '-__v -messages'

const get = (params = {}) => {
  return Chapter.find(params, unselected_fields)
  .populate(author)
  .populate(message_author)
  .populate(guests)
}

const paginate = (params,paginationOptions) => {
  paginationOptions.populate = [
    author, message_author, guests
  ]
  paginationOptions.select = unselected_fields
  return Chapter.paginate(params, paginationOptions)
}

const getOne = (params = {}) => {
  return Chapter.findOne(params, unselected_fields)
  .populate(author)
  .populate(message_author)
  .populate(guests)
}

const post = input => {
  const chapter = new Chapter(input)

  //chapter.setMessages(input.messages)
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
  ,paginate
}
