const User = require('../../models/User')
const {
  queryByName
  ,getPaginate
} = require('../Users/business')
const {
  Chapter
} = require('../../models/Chapter')

const filterGuests = ({_id, name}, paginationOptions) => {
  
  const name_query = queryByName(name)
  
  const defaultParams = {
    _id: {
      $ne: _id
    }
  }
  
  const params =  Object.assign({}, defaultParams, name_query)
  
  return getPaginate(params, paginationOptions)
}

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
  ,filterGuests
}
