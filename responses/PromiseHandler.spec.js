const {
  handlerPromiseFactory
  ,handlerPromise
  ,handlerPromisePagination
} = require('./PromiseHandler')

const {
  parseResponse
} = require('../src/Pagination/business')

const {
  success
  ,error
} = require('./index')

const req = {
  body: {
    name: 'Homer Simpson'
  }
}

const reqFactory = data => Object.assign({}, data)

// FACTORIES
const getPromiseFactory = () => jest.fn(req => Promise.resolve(req.body))
const getPromiseRejectedFactory = () => jest.fn(req => Promise.reject(req.body))
const resFactory = (fn) => ({
  send: jest.fn(fn)
})

describe('handlerPromise', () => {
  test('getPromise should be called in order to get a promise', () => {
    const getPromise = getPromiseFactory()
    const handler = handlerPromise(getPromise)
    const res = resFactory()
    handler(req, res)
    .then(() => expect(getPromise.mock.calls.length).toEqual(1))
  })
  test('res should be called once on success and response model should match', () => {
    const handler = handlerPromise(getPromiseFactory())
    const res = resFactory(data => expect(data).toMatchSnapshot())
    handler(req, res)
    .then(() => expect(res.send.mock.calls.length).toEqual(1))
  })
  test('res should be called once on error and response model should match', () => {
    const handler = handlerPromise(getPromiseRejectedFactory())
    const res = resFactory(data => expect(data).toMatchSnapshot())
    handler(req, res)
    .then(() => expect(res.send.mock.calls.length).toEqual(1))
  })
})

describe('handlerPromisePagination', () => {
  test('the response match with Pagination.parseResponse', () => {
    const handler = handlerPromisePagination(getPromiseFactory())
    const res = resFactory(data => expect(data).toMatchSnapshot())
    const body = {
      docs: []
      ,total: 0
      ,offset: 0
      ,limit: 10
    }
    const req = reqFactory({
      body
    })
    handler(req, res)
  })
})
