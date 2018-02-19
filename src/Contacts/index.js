const {
    PromiseHandler
} = require('../../responses/PromiseHandler')

const Provider = require('../../providers/Provider');

const {
    getLoggedUserIdFromReq
} = require('../../selectors/index');

const User = require('../../models/User');

const getContacts = (req) => {

    const {_id} = getLoggedUserIdFromReq(req)
    
    return User.findOne({_id})
    .then(user => {

        //@smells demeter law
        Provider
        .for(user.authentication.provider_name)
        .access_token(user.authentication.provider_access_token);

        return new Promise((resolve, reject) => {
            Provider
            .for(user.authentication.provider_name)
            .contacts({}, function(err, contacts) {
                if (err) {
                    return reject(err)
                }
                return resolve(contacts.data)
            })
        })
    })
}

const get = PromiseHandler(getContacts);

module.exports = {
    get
}