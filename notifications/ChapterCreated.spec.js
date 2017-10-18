jest.mock('fcm-push')

const {
  chapter_created_format
  ,chapterCreated
} = require('./index')

const chapter_created_format_mock = jest.fn(chapter_created_format)

const chapter = {
  description: 'The description',
  author: {
    first_name: 'Pepe'
  },
  guests: [
    {
      user: {
        regid: 'regid1'
      }
    }
    ,{
      user: {
        regid: 'regid2'
      }
    }
  ]
}

describe('ChapterCreated', () => {
  
  test('chapter created payload should match', () => {
    expect(chapter_created_format_mock(chapter)).toMatchSnapshot()
  })
  
  test('send response match with snapshot', () => {
    expect.assertions(1)
    chapterCreated(chapter)
    .then(res => {
      expect(res).toMatchSnapshot()
    })
  })
})