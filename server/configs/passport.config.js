const User = require('../models/User.model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passport = require('passport')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  User.findById(user._id)
    .populate('calendar')
    .populate('pets')
    .exec(function (err, data) {
      if (err) {
        console.log("Error:", err);
      } else {
        done(null, data)
      }
    })
})

passport.use(new LocalStrategy((username, password, next) => {

  User.findOne({
      username
    }, (err, foundUser) => {
      if (err) {
        next(err)
        return
      }

      if (!foundUser) {
        next(null, false, {
          message: 'Usuario no registrado.'
        })
        return
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, {
          message: 'Contraseña incorrecta.'
        })
        return
      }

      next(null, foundUser)
    }).populate('calendar')
    .populate('pets')

    .catch(err => console.log(err))

}))