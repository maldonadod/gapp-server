const graph = require('fbgraph')

const me = access_token => {
  graph.setAccessToken(access_token)
  return new Promise((resolve, reject) => {
    graph.get('/me', {
      fields: 'id, picture, name, first_name, last_name'
    }, (err, data) => {
      if (err) { return reject(err) }
      
      const {id,name,first_name,last_name,picture} = data
      const profile = {
        facebook_id: id,
        full_name: name,
        first_name,
        last_name,
        profile_picture: {
          url: picture.data.url
        }
      }
      return resolve(profile)
    })
  })
}

function get_friends(url = '/me/friends', options) {
  
  graph.get(url, options, function(err, res) {
    res.data.map(friend => console.log(friend.name, friend.id))
    
    if (err) { return console.log(err) }
    
    if (res.paging.next) {
      get_friends(res.paging.next)
    }
  })
}

module.exports = {
  me
}