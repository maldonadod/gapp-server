const {
  checkOwnPropery
} = require('../../utils/checkOwnPropery')
const {
  isOKSelector
} = require('../../messages')

const has_status_propery = checkOwnPropery('status')
const has_results_propery = checkOwnPropery('results')

// PRESENTER
const format_item = ({formatted_address, geometry}) => ({
  formatted_address: parse_address(formatted_address),
  coords: geometry.location
})
const parse_address = address => {
  return address
  .replace(/([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4})/, '')
  .split(',')
  .map(chunk => chunk.trim())
  .join(', ')
}


// DEFAULT LOGIC FLOW
const from_promise = handler => Api => query => Api(query).then(handler)
const select_results = incoming => has_results_propery(incoming) ? incoming.results : []
const is_status_ok = isOKSelector(has_status_propery)
const format_flow = get_results => 
                    format_item => 
                    incoming    => get_results(incoming).map(format_item)

// COMPOSE
const format = format_flow(select_results)(format_item)
const is_ok_then_format = incoming => is_status_ok(incoming) && format(incoming)
const queryPlacesFrom = from_promise(is_ok_then_format)

module.exports = {
  queryPlacesFrom
  ,from_promise
  ,select_results
  ,is_status_ok
  ,format_flow
}