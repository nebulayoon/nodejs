const app = require("../app")
const logger = require("../config/winston")
const PORT = 7777

app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`)
})