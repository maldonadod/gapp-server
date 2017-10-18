const {
  send
} = require('../gcm')
const {
  chapter_created_format
} = require('./formats')

const factory = () => {}

const get_args_send = get_args => incoming => {
  const args = get_args(incoming)
  return send(...args)
}

// GCMMessageI = [ message, registerIds ]
const chapterCreated = get_args_send(chapter_created_format)

module.exports = {
  chapterCreated,
  chapter_created_format
}
