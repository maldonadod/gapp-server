const {
    PromiseHandler
} = require('../../responses/PromiseHandler')

const Provider = require('../../providers/Provider');

const {
    getLoggedUserIdFromReq
} = require('../../selectors/index');

const User = require('../../models/User');

const getContacts = (req) => {

    return User.find({}).then(x => ({
        results: x,
		paging: {
			limit: 2,
			total: 30,
			offset: 2
		}
    }));
}

const get = PromiseHandler(getContacts);

module.exports = {
    get
}