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

const parsePaging = ({limit,total,offset}) => ({limit,total,offset})

const parseResponse = ({status,data}) => ({status, data: [...data.docs], paging: parsePaging(data)})

module.exports = {
  getOptions: getOptions(defaultParams)
  ,parseResponse
}
