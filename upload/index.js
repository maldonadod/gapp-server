const cloudinary = require('cloudinary')

const transformURL = (options, picture) => {
  const {public_id,format} = picture
  const url = cloudinary.url(`${public_id}.${format}`, options)
  const result = Object.assign({}, picture, {
    url
  })
  return result
}

const avatarOptions = {
  secure: true,
  width: 200,
  height: 200,
  crop: 'thumb',
  gravity: 'face',
  effect: 'saturation:100'
}
const chapterCoverOptions = {
  quality: 40,
  crop: 'scale',
  width: 600
}
const plugFactory = options => formatter => picture => formatter(transformURL(options, picture))

const plugAvatarTransformation = plugFactory(avatarOptions)
const plugChapterCoverTransformation = plugFactory(chapterCoverOptions)

module.exports = {
  plugAvatarTransformation
  ,plugChapterCoverTransformation
}