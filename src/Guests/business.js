const User = require('../../models/User')
const {
  Chapter
} = require('../../models/Chapter')

const get = params => {
  return User.find(params, User.USER_UNSELECTED_FIELDS)
}

const getPaginate = (params,paginationOptions) => {
  paginationOptions.select = User.USER_UNSELECTED_FIELDS
  return User.paginate(params, paginationOptions)
}

const update = (_id, guest_id, {status}) => {
  console.log(status)
  return Chapter.findOne({
    _id
  })
  .then(chapter => {

    chapter.guests = chapter.guests.map(guest => {
      console.log(guest._id, guest_id, guest._id === guest_id)
      if (String(guest._id) === guest_id) {
        guest.status = status
      }
      return guest;
    })

    return chapter.save()
  })
}

module.exports = {
  get
  ,getPaginate
  ,update
}
