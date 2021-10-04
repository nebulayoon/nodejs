const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const authRouter = require("./routes/auth-router")
const passportInit = require("./happy-passport")

const app = express()

passportInit(app, passport)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  key: 'loginkey',
  secret: '@#$s3cr3t',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 7,
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRouter)

app.use( (err, req, res, next) => {
  console.log("어플리케이션 레벨 라우팅 에러", err.message)
  console.log(err.stack)
  res.status(err.status || 500)
  res.json({ code: err.code, msg : err.message, status: err.status })
})

module.exports = app