const passport = require('passport')
const session = require('express-session')
require('./passport.config')

module.exports = app => {
  app.use(session({
    secret: 'Whatever',
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
}