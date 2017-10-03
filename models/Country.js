const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const CountrySchema = new Schema({
  id: String,
  name: String
}, {
  collection: 'Countries'
})

const Country = mongoose.model('Country', CountrySchema)

module.exports = {
  Country,
  CountrySchema
}
