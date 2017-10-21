const {
  getLoggedUserIdFromReq
  ,getPaginateOptionsFromReq
  ,getAuthorFromLoggedUser
  ,getPaginationOptionsFromQueryReq
  ,getNameFromQueryReq
} = require('./index')

const loggedInUser = {
  _id: 1
}

const reqFactory = data => Object.assign({}, data)

test('should return name from query req', () => {
  expect.assertions(1)
  const req = reqFactory({
    query: {
      name: 'hola'
    }
  })
  expect(getNameFromQueryReq(req)).toMatchSnapshot()
})

test('should return pagination options from query req', () => {
  expect.assertions(1)
  const req = reqFactory({
    query: {
      limit: 2,
      offset: 4
    }
  })
  expect(getPaginationOptionsFromQueryReq(req)).toMatchSnapshot()
})

test('should return undefined if loggedInUser doesnt exists', () => {
  const req = reqFactory({})
  const {
    _id
  } = loggedInUser
  expect(getLoggedUserIdFromReq(req)).toMatchSnapshot()
})

test('should return object selector id', () => {
  const req = reqFactory({loggedInUser})
  const {
    _id
  } = loggedInUser
  expect(getLoggedUserIdFromReq(req)).toEqual({_id})
})

test('should return object selector author', () => {
  const req = reqFactory({loggedInUser})
  const {
    _id
  } = loggedInUser
  expect(getAuthorFromLoggedUser(req)).toEqual({author: _id})
})

test('should return correct object for pagination', () => {
  const query = {
    offset: 2
    ,limit: 2
  }
  const req = reqFactory({query})
  expect(getPaginateOptionsFromReq(req)).toEqual(query)
})

test('should return default offset in case does not exist in query string', () => {
  const query = {
    limit: 2
  }
  const expected = {
    limit: 2
    ,offset: 0
  }
  const req = reqFactory({query})
  expect(getPaginateOptionsFromReq(req)).toEqual(expected)
})

test('should return default limit in case does not exist in query string', () => {
  const query = {
    offset: 4
  }
  const expected = {
    limit: 20
    ,offset: 4
  }
  const req = reqFactory({query})
  expect(getPaginateOptionsFromReq(req)).toEqual(expected)
})

test('should return default pagination options in case they dont exist in query string', () => {
  const query = {}
  const expected = {
    limit: 20
    ,offset: 0
  }
  const req = reqFactory({query})
  expect(getPaginateOptionsFromReq(req)).toEqual(expected)
})