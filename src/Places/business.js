const queryPlacesFrom = api => query => {
  return api(query)
}

const parseResponseOf = parser => api => query => parser(queryPlacesFrom(api)(query))

const parseAddress = address => {
  return address
  .replace(/([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4})/, '')
  .split(',')
  .map(chunk => chunk.trim())
  .join(', ')
}
const formatPlace = ({formatted_address, name, geometry}) => ({
  formatted_address: parseAddress(formatted_address),
  coords: geometry.location
})

const parser = promise => {
    
  return promise
  .then(res => {
    
    if (res.status === 'OK') {
      return res.results.map(formatPlace)
    }
    return res
  })
}

module.exports = {
  queryPlacesFrom: parseResponseOf(parser)
}