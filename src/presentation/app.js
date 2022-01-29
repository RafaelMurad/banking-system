const express = require("express")

const { createConnection } = require("../data/connection/mongodb")

async function start() {
  const app = express()
  const port = process.env.PORT || 3000

  const connection = await createConnection({
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME
  })

  app.use(express.json())

  app.listen(port, () => {
    console.log(`Server starter on port ${port}`)
  })
}

module.exports = { start }
