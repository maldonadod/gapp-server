const queryPlacesFrom = api => query => {
  return api(query)
}

const from = parser => api => query => parser(queryPlacesFrom(api)(query))

const parseAddress = address => {
  return address
  .replace(/([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4})/, '')
  .split(',')
  .map(chunk => chunk.trim())
  .join(', ')
}
const formatItem = ({formatted_address, geometry}) => ({
  formatted_address: parseAddress(formatted_address),
  coords: geometry.location
})

const isOK = selector => res => selector(res) === 'OK'
const selectStatus = res => !res.hasOwnProperty('status') ? null : res.status

const applyParser = selector => 
                    isAplicable => 
                    getCollec => 
                    formatItem => 
                    res => isAplicable(selector)(res) && getCollec(res).map(formatItem)

const selectCollection = res => res.results

const parser = applyit => promise => {
  return promise.then(applyit)
}

const getCollection = res => res.results

module.exports = {
  queryPlacesFrom: from(parser(applyParser(selectStatus)(isOK)(getCollection)(formatItem)))
}