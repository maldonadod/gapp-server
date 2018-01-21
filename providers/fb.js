const graph = require('fbgraph')

const access_token = (access_token) => {
  graph.setAccessToken(access_token)
}

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

function contacts(options, cb) {
  
  graph.get('/me/friends', cb)
}

module.exports = {
  me,
  contacts,
  access_token
}