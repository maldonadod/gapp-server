const {
  plugAvatarTransformation
} = require('./index')
const UploadMiddleware = require('./middleware')

module.exports = UploadMiddleware(plugAvatarTransformation(profile_picture => ({profile_picture})))