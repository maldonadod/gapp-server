module.exports = function app(state = [], {type, data}) {
  switch (type) {
    case 'USER_GETTING_EVENTS':
    return [...state, data]
    default:
      return state
  }
}