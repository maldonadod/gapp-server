const EventEmitter = require('events').EventEmitter

function Busboy({headers}) {
  
  this.store = new EventEmitter()
}

Busboy.prototype.on = function (key, handler) {
  this.store.on(key, handler)
  return this
}

Busboy.prototype.feed = function ({fieldname}) {
  const fileEmmiter = new EventEmitter()
  
  const file = {
    on: function(key, handler) {
      fileEmmiter.on(key, handler)
      return this
    },
    store: fileEmmiter
  }
  
  this.store.emit('file', fieldname, file)

  setTimeout(() => {
    fileEmmiter.emit('end')
  })
};


module.exports = Busboy