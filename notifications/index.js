const {
  send
} = require('../gcm')

const factory = () => {}

const get_args_send = get_args => incoming => {
  const args = get_args(incoming)
  return send(...args)
}

const chapter_created_format = chapter => {
  const {
    author
    ,guests
  } = chapter
  
  return [
    `${author.first_name} invite you`
    ,guests.map(guest => guest.user.regid)
  ]
}

const chapterCreated = get_args_send(chapter_created_format)

module.exports = {
  chapterCreated
  ,chapter_created_format
}
