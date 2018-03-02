const {
    PromiseHandler
} = require('../../responses/PromiseHandler')

const Provider = require('../../providers/Provider');

const {
    getLoggedUserIdFromReq
} = require('../../selectors/index');

const UserBusiness = require('../Users/business');

const getContacts = (req) => {

    return UserBusiness.get({}).then(x => ({
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