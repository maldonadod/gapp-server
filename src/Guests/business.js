const User = require('../../models/User')
const {
  Chapter
} = require('../../models/Chapter')

const update = (_id, guest_id, {status}) => {
  return Chapter.findOne({
    _id
  })
  .then(chapter => {

    chapter.guests = chapter.guests.map(guest => {
      if (String(guest._id) === guest_id) {
        guest.status = status
      }
      return guest;
    })

    return chapter.save()
  })
}

module.exports = {
  update
}
