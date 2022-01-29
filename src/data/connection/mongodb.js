const { MongoClient, Db } = require('mongodb')

/**
 * MongoClient default settings
 */
const defaults = {
  useNewUrlParser: true
}

async function connect({ uri, dbName, options = {} }) {
  const client = await MongoClient.connect(uri, { ...defaults, ...options })
  return client.db(dbName)
}

async function createConnection(config) {
  return connect(config)
}

module.exports = { createConnection }
