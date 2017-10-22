module.exports = function errors(state = [], action) {
  const {type, info} = action
  switch (type) {
    case 'LOG_INFO':
    return [...state, error]
    default:
      return state
  }
}