const {
    PromiseHandler
} = require('../../responses/PromiseHandler')

const Provider = require('../../providers/Provider');

const {
    getLoggedUserIdFromReq
} = require('../../selectors/index');

const User = require('../../models/User');

const getContacts = (req) => {

    return User.find({}).then(x => x);
}

const get = PromiseHandler(getContacts);

module.exports = {
    get
}