const Datastore = require('nedb')
const path = require('path')

const db = new Datastore({
  filename: path.join(__dirname, '..', 'data', 'entries'),
  autoload: true,
  timestampData: true
})

module.exports = db
