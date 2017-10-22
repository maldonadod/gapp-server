const {
  plugChapterCoverTransformation
} = require('./index')
const UploadMiddleware = require('./middleware')
const {
  chapterCoverUploadFormat
} = require('../src/Chapters/business')

module.exports = UploadMiddleware(plugChapterCoverTransformation(chapterCoverUploadFormat))