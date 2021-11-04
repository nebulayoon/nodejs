const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '533861310294-8e78afus1ho49prtu0q7r7t9u0jbcn64.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
<<<<<<< HEAD
    console.log(profile)
=======
    //DB call
>>>>>>> b3a4b28c007ac9db8d52afc9d0dba85a42ad3de8
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// provider, id, email, Name