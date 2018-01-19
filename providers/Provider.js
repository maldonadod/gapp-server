const select = require('./index');

function Provider(p) {
    this.provider = p;
}

const providers = {
    facebook() {
        return new Provider();
    }
}

Provider.prototype.me = function me() {
    return this.provider.me();
}

Provider.prototype.contacts = function me() {
    return this.provider.contacts();
}

Provider.for = function(key) {
    return select.select(key);
}

module.exports = Provider