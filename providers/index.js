const fb = require('./fb');

const providers = {
	facebook: fb
}

module.exports = {
	select(key) {
		return providers[key]
	}
}