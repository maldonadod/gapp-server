const checkOwnPropery = property => obj => !obj.hasOwnProperty(property) ? null : obj[property] 

module.exports = {
  checkOwnPropery
}