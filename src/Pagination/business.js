const defaultParams = {
  limit: 20
  ,offset: 0
}

const parseOptions = ({
  limit
  ,offset
}) => ({
  limit: parseInt(limit)
  ,offset: parseInt(offset)
})

const getOptions = defaultParams => params => parseOptions(Object.assign({}, defaultParams, params))

module.exports = {
  getOptions: getOptions(defaultParams)
}
