const passport = require("passport")
const LocalStrategy = require("passport-local")

const HappyUser = {
  id: 1,
  email: "test@gmail.com",
  name: "해윙",
  age: 23,
  passwd: "1111",
}

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
  }, (email, passwd, done) => { // callback
    if(email === HappyUser.email && passwd === HappyUser.passwd){
      let user = JSON.parse(JSON.stringify(HappyUser))
      delete user.passwd
      done(null, user)
    }else {
      const error = new Error("User is not exists!")
      error.status = 401;
      error.code = "Unauthorized";
      done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    if(user){
      done(null, user)
    }else{
      done(null, null)
    }
  })
}