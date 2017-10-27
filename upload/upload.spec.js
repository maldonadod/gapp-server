jest.mock('busboy')
jest.mock('cloudinary')
const middleware = require('./middleware')
const cloudinary = require('cloudinary')
const {
  chapterCoverUploadFormat
} = require('../src/Chapters/business')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5

function makeCallback(done, body) {
  return (...args) => {
    try {
      body(...args);
      done();
    } catch (error) {
      done.fail(error);
    }
  };
}

describe('Upload', () => {

  test('middleware', done => {
    expect.assertions(2)
    const chapter = {
      description: 'The description'
    }
    const req = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      ,pipe: thing => thing.feed({fieldname: 'cover', fields: chapter})
    }
    const res = {}
    const next = jest.fn(makeCallback(done, () => {
      const cover = cloudinary.getCover()
      expect(res.locals).toMatchSnapshot()
      expect(next.mock.calls.length).toEqual(1)
    }))

    middleware(chapterCoverUploadFormat)(req, res, next)
  })
})
