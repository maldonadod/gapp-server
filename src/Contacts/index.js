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

        Provider
        .for(user.authentication.provider_name)
        .access_token('EAAMon5zuVZAQBAPUR07mcsDmnRtqeZBDRQsUJZAvWqe4XR3d1xq9rrcapSp21AHkCbFU2L393ZAZCesnh3iPZCQVJSJXMoQpaXqTQgK3ILVi6kQDY3fz9dGF5S4922EftbWOElK70Bk8RA7aMFeZBZA5whsQaYNYKE8me8kNzb3sABmfzOfiDC6tWnbnmoq8SWxuSL0r1yyBxnmM3AhNNLuZCRpEvFey5M3l3CDivwZCAKXAZDZD');

        return Provider
        .for(user.authentication.provider_name)
        .contacts({}, function(err, contacts) {
            console.log(err, contacts)
        })
    })
}

const get = PromiseHandler(getContacts);

module.exports = {
    get
}