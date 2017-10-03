const {
  handlerPromiseFactory
  ,handlerPromise
  ,formatAndResponse
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

describe('handlerPromiseFactory', () => {


  test('handlerPromiseFactory should create a proper handler', () => {

    const mockedSuccess = jest.fn(data => success(data))
    const mockedError = jest.fn(message => error(message))
    const promise = jest.fn(req => Promise.reject(req.body))

    const res = resFactory(output => expect(output).toMatchSnapshot())

    const handleResponseSuccess = formatAndResponse(mockedSuccess)
    const handleResponseError = formatAndResponse(mockedError)

    const handlerPromise = handlerPromiseFactory(handleResponseSuccess)(handleResponseError)

    const handler = handlerPromise(promise)
    const body = {
      body: 'pepito'
    }
    const req = reqFactory(body)

    handler(req, res)
    .then(data => {
      expect(promise.mock.calls.length).toEqual(1)
      expect(mockedSuccess.mock.calls.length).toEqual(0)
      expect(res.send.mock.calls.length).toEqual(1)
      expect(mockedError.mock.calls.length).toEqual(1)
    })
  })
})
