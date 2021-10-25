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
    return done(err, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})