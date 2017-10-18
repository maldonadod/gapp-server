// Chapter -> Array<message, registerIds>
// message => 'will you join to the AuthorName's party, mister ?'
const format = chapter => {
  const {
    author
    ,guests
  } = chapter
  
  const registerIds = guests.map(guest => guest.user.regid)
  const message = `will you join to the ${author.first_name}'s party, mister ?`
  return [message, registerIds]
}

module.exports = {
  format
}