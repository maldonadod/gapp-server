module.exports = function errors(state = [], action) {
  const {type, error} = action
  switch (type) {
    case 'SUPER_ERROR':
    return [...state, error]
    default:
      return state
  }
}