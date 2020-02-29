const express = require('express')
const authRoutes = express.Router()
const sendMail = require('../configs/mailer.config').welcomeMail
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/User.model')


authRoutes.post('/signup', (req, res, next) => {
    const {
        username,
        password,
        confirmPassword,
        email
    } = req.body

    if (!username) {
        res.status(400).json({
            message: 'Porfavor, introduzca nombre de usuario.'
        })
        return
    }
    if (!password) {
        res.status(400).json({
            message: 'Porfavor, introduzca contraseña.'
        })
        return
    }

    if (password != confirmPassword) {
        res.status(400).json({
            message: 'Las contraseñas no coinciden.'
        })
    }
    if (!email) {
        res.status(400).json({
            message: 'Porfavor, introduzca correo electrónico.'
        })
    }

    if (password.length < 7) {
        res.status(400).json({
            message: 'La contraseña debe tener al menos 8 carácteres.'
        })
        return
    }
    if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
        res.status(400).json({
            message: 'La contraseña debe tener al menos una mayúscula y un número.'
        })
        return
    }

    User.findOne({
        username
    }, (err, foundUser) => {

        if (err) {
            res.status(500).json({
                message: "Username check went bad."
            })
            return
        }

        if (foundUser) {
            res.status(400).json({
                message: 'Ya existe este nombre de usuario.'
            })
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
            username: username,
            password: hashPass
        })

        aNewUser.save(err => {
            if (err) {
                res.status(400).json({
                    message: 'Saving user to database went wrong.'
                })
                return
            }
            sendMail(username, email, password)


            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({
                        message: 'Login after signup went bad.'
                    })
                    return
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user)
                res.json(aNewUser)
            })
        })
    })
})






authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: 'Algo ha ido mal, porfavor, inténtelo de nuevo.'
            })
            return
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails)
            return
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Session save went bad.'
                })
                return
            }

            // We are now logged in (that's why we can also send req.user)
            res.json(theUser)
        })
    })(req, res, next)
})



authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout()
    res.json({
        message: 'Sesión cerrada.'
    })
})


authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.json(req.user)
        return
    }
    res.status(403).json({
        message: 'No autorizado.'
    })
})

module.exports = authRoutes