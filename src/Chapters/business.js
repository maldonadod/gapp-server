const {
  Chapter
} = require('../../models/Chapter')

const User = require('../../models/User')
const {
  plugChapterCoverTransformation
} = require('../../upload')
const chapterCoverUploadFormat = cover => ({
  cover
})

const author = {
  path: 'author',
  select: User.USER_UNSELECTED_FIELDS,
  populate: {
    path: 'country',
    select: '-__v -_id'
  }
}

const author_country = {
  path: 'author.country',
  select: '-__v -_id'
}

const guests = {
  path: 'guests.user',
  select: User.USER_UNSELECTED_FIELDS,
  populate: {
    path: 'country',
    select: '-__v -_id'
  }
}

const message_author = {
  path: 'messages.author',
  select: User.USER_UNSELECTED_FIELDS
}

const unselected_fields = `
  -__v -messages`

const get = (params = {}) => {
  return Chapter.find(params, unselected_fields)
  .populate(author)
  .populate(message_author)
  .populate(guests)
}

const justURL = ({url}) => ({url})

const paginate = (params,paginationOptions) => {
  paginationOptions.populate = [
    author, message_author, guests
  ]
  paginationOptions.select = unselected_fields
  return Chapter.paginate(params, paginationOptions)
  .then(chapters => {
    
    chapters.docs = chapters.docs.map(chapter => {
      chapter.cover = plugChapterCoverTransformation(justURL)(chapter.cover)
      
      return chapter
    })
    
    return chapters
  })
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

const update = ({_id}, input) => Chapter.update({_id}, { $set: input })

const InvitationQuery = ({user}) => {
  const query = {
    guests: {
      $elemMatch: { user }
    }
  }
  return query
}

module.exports = {
  get
  ,post
  ,getOne
  ,paginate
  ,update
  ,chapterCoverUploadFormat
  ,InvitationQuery
}
