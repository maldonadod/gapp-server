const RegExpFactory = value => new RegExp(value, 'gi')

const orQueries = params => ({ $or: params })

const mapFieldsToQueryRegex = (fields, query) => {
  return orQueries(fields.map(field => ({[field]:RegExpFactory(query)})))
}

const mergeQueries = queries => Object.assign.apply(Object, queries)

module.exports = {
  mapFieldsToQueryRegex
  ,mergeQueries
}
