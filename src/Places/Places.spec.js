const {
  queryPlacesFrom
  ,format_flow
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

const resultsFactory = (...args) => ({
  results: [...args]
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

describe('format_flow piece', () => {
  
  const get_results = incoming => incoming.results
  const format_item = item => item

  
  test('get_results should be called once and format_item should be called as many as items', () => {
  
    const get_results_mock = jest.fn(get_results)
    const format_item_mock = jest.fn(format_item)
    
    const input = resultsFactory(1, 2, 3)
    const format = format_flow(get_results_mock)(format_item_mock)
    const formatted = format(input)
    
    expect(get_results_mock.mock.calls.length).toEqual(1)
    expect(format_item_mock.mock.calls.length).toEqual(3)
  })
  
  test('get results and return each item', () => {
    
    const input = resultsFactory(1, 2, 3)
    const format = format_flow(get_results)(format_item)
    const formatted = format(input)
    
    expect(formatted).toMatchSnapshot()
  })
  
  test('get results and double each item', () => {
    
    const format_item = item => item * 2
    
    const input = resultsFactory(1, 2, 3)
    const format = format_flow(get_results)(format_item)
    const formatted = format(input)
    
    expect(formatted).toMatchSnapshot()
  })
  
  test('format each item pass in by get_results', () => {
    
    const format_item = ({title,authors,date}) => {
      return `${title} created on ${date} was a band integrated by ${authors}`
    }
    
    const input = resultsFactory({
      title: 'The doors'
      ,authors: 'Jim Morrison, Ray Manzarek, John Densmore and Robby Krieger'
      ,date: '1965 July'
    }
    ,{
      title: 'Led zepelin'
      ,authors: 'Robert PlantJimmy Page, John Bonham and John Paul Jones'
      ,date: '1968'
    })
    const format = format_flow(get_results)(format_item)
    const formatted = format(input)
    
    expect(formatted).toMatchSnapshot()
  })
})