const ErrorHandler = {}

const select = ({errors}) => errors

const handler = getState => {
  
  const state = select(getState())
}

ErrorHandler.subscribe_to = (source) => source.subscribe(handler.bind(null, source.getState))

module.exports = ErrorHandler