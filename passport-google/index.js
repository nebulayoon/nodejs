const express  = require('express')
const passport = require('passport')

require('./auth');

const app = express();

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/protected', (req, res) => {
  res.send('Hello!')
}) 

app.listen(5000, () => console.log('listening on : 5000'))