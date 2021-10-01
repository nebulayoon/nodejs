const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("해윙~")
})

app.listen(5000, () => {
  console.log("서버 가동")
})