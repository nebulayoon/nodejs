'use strict'
const passport = require("passport")

exports.userLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      return next(err)
    }
    
    return req.login(user, (err) => {
      if(err){
        return next(err)
      }
      res.status(200).json({ loginUser: user })
    })
  }) (req, res, next)
}

exports.userLogout = (req, res, next) => {
  req.session.destory()
  req.session = null
  res.status(200).send({ "ACK" : "SUCCESS" })
}

exports.userInfo = (req, res, next) => {
  res.status(200).send(req.user)
}