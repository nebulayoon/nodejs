const express = require("express")
const logger = require("./config/winston")

const app = express()

app.get('/', (req, res) => {
  logger.info('GET /')
  res.sendStatus(200)
})

app.get('/error', (req, res) => {
  logger.error("Error message")
  res.sendStatus(500)
})

module.exports = app