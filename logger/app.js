const express = require("express")
const logger = require("./config/winston")

const app = express()

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  logger.info(`GET / | ${ip}`)
  res.sendStatus(200)
})

app.get('/error', (req, res) => {
  logger.error("Error message")
  res.sendStatus(500)
})

module.exports = app