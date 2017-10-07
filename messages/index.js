const OK = 'OK'
const equal = right => left => left === right
const isOK = message => equal(OK)(message) 
const isOKSelector = selector => incoming => isOK(selector(incoming))

module.exports = {
  isOK,
  isOKSelector
}