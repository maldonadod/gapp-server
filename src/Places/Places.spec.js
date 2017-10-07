const {
  queryPlacesFrom
} = require('./business')

const modelFactory = () => ({
  status: 'OK',
  results: [
    {
      "formatted_address": "Av. Corrientes 455, C1043AAR CABA, Argentina",
      "geometry": {
        "location": {
          "lat": -34.6029208,
          "lng": -58.3732758
        }
      }
    }
  ]
})

describe('Places queryPlacesFrom',  () => {
  
  test('should call to api', () => {
    const api = jest.fn(query => Promise.resolve(modelFactory()))
    expect.assertions(1)
    return queryPlacesFrom(api)('queso')
    .then(res => expect(api.mock.calls.length).toEqual(1))
  })
  test('response from api should be parsed and match with the success model', () => {
    const api_res = modelFactory()
    const api = jest.fn(query => Promise.resolve(api_res))
    expect.assertions(1)
    return queryPlacesFrom(api)('nana')
    .then(res => expect(res).toMatchSnapshot())
  })
  test('query should be pass into api', () => {
    const query = 'nana'
    const api = jest.fn(query => Promise.resolve({}))
    expect.assertions(1)
    return queryPlacesFrom(api)(query)
    .then(res => expect(api.mock.calls[0][0]).toEqual(query))
  })
})