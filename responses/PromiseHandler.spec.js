const {
  handlerPromiseFactory
  ,handlerPromise
  ,handlerPromisePagination
} = require('./PromiseHandler')

const success = jest.fn()
const error = jest.fn()

const req = {
  body: {
    name: 'Homer Simpson'
  }
}

const responseObjs = {
  error: {
    status: 'ERR',
    message: {
      name: 'Homer Simpson'
    }
  },
  success: {
    status: 'OK',
    data: {
      name: 'Homer Simpson'
    }
  }
}

// FACTORIES
const getPromiseFactory = () => jest.fn(req => Promise.resolve(req.body))
const getPromiseRejectedFactory = () => jest.fn(req => Promise.reject(req.body))
const resFactory = (fn) => ({
  send: jest.fn(fn)
})
 
test('getPromise should be called in order to get a promise', () => {
  const getPromise = getPromiseFactory()
  const handler = handlerPromise(getPromise)
  const res = resFactory()
  handler(req, res)
  .then(() => expect(getPromise.mock.calls.length).toEqual(1))
})
test('res should be called once on success and response model should match', () => {
  const handler = handlerPromise(getPromiseFactory())
  const res = resFactory(data => expect(data).toEqual(responseObjs.success))
  handler(req, res)
  .then(() => expect(res.send.mock.calls.length).toEqual(1))
})
test('res should be called once on error and response model should match', () => {
  const handler = handlerPromise(getPromiseRejectedFactory())
  const res = resFactory(data => expect(data).toEqual(responseObjs.error))
  handler(req, res)
  .then(() => expect(res.send.mock.calls.length).toEqual(1))
})
