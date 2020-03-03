const express = require('express')
const authRoutes = express.Router()
const sendMail = require('../configs/mailer.config').welcomeMail
const changeEmail = require('../configs/mailer.config').newEmail
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
        res.json({
            message: 'Porfavor, introduzca nombre de usuario.',
            status: 'fail'
        })
        return
    }

    if (!password) {
        res.json({
            message: 'Porfavor, introduzca contraseña.',
            status: 'fail'
        })
        return
    }

    if (password != confirmPassword) {
        res.json({
            message: 'Las contraseñas no coinciden.',
            status: 'fail'
        })
    }

    if (!email) {
        res.json({
            message: 'Porfavor, introduzca correo electrónico.',
            status: 'fail'
        })
        return
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
        res.json({
            message: 'Introduce una dirección de correo válida',
            status: 'fail'
        })
        return
    }

    if (password.length < 6) {
        res.json({
            message: 'La contraseña debe tener al menos 8 carácteres.',
            status: 'fail'
        })
        return
    }

    if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
        res.json({
            message: 'La contraseña debe tener al menos una mayúscula y un número.',
            status: 'fail'
        })
        return
    }

    User.findOne({
        username
    }, (err, foundUser) => {

        if (err) {
            res.json({
                message: "Nombre de usuario incorrecto.",
                status: 'fail'
            })
            return
        }

        if (foundUser) {
            res.json({
                message: 'Ya existe este nombre de usuario.',
                status: 'fail'
            })
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
            username,
            password: hashPass,
            email
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

    const {
        username,
        password
    } = req.body

    if (!username) {
        res.json({
            message: 'Porfavor, introduce nombre de usuario.',
            status: 'fail'
        })
        return
    }

    if (!password) {
        res.json({
            message: 'Porfavor, introduce la contraseña.',
            status: 'fail'
        })
        return
    }



    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.json({
                message: 'Algo ha ido mal, porfavor, inténtelo de nuevo.',
                status: 'fail'
            })
            return
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.json({
                message: failureDetails.message,
                status: 'fail'
            })
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
    res.json({
        message: 'No autorizado.',
        status: 'fail'
    })
})


authRoutes.put('/updateUsername', (req, res, next) => {

    const {
        username
    } = req.body

    User.findOne({
        username
    }, (err, foundUser) => {

        if (err) {
            res.json({
                message: "Nombre de usuario incorrecto.",
                status: 'fail'
            })
            return
        }

        if (foundUser) {
            res.json({
                message: 'Ya existe este nombre de usuario.',
                status: 'fail'
            })
            return
        }
    })

    if (!username) {
        res.json({
            message: 'Porfavor, introduzca nombre de usuario.',
            status: 'fail'
        })
        return
    }

    if (username === req.user.username) {
        res.json({
            message: 'Ya estás usando este nombre de usuario',
            status: 'fail'
        })
        return
    }

    User.findByIdAndUpdate(req.user._id, {
            username
        }, {
            new: true
        })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

authRoutes.put('/updatePassword', (req, res, next) => {

    const {
        password,
        confirmPassword
    } = req.body

    if (!password) {
        res.json({
            message: 'Porfavor, introduzca contraseña.',
            status: 'fail'
        })
        return
    }

    if (password != confirmPassword) {
        res.json({
            message: 'Las contraseñas no coinciden.',
            status: 'fail'
        })
        return
    }

    if (password.length < 6) {
        res.json({
            message: 'La contraseña debe tener al menos 8 carácteres.',
            status: 'fail'
        })
        return
    }

    if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
        res.status(400).json({
            message: 'La contraseña debe tener al menos una mayúscula y un número.',
            status: 'fail'
        })
        return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)

    if (bcrypt.compareSync(password, req.user.password)) {
        res.json({
            status: 'fail',
            message: 'Ya estás usando esta contraseña'
        })
        return
    }

    User.findByIdAndUpdate(req.user._id, {
            password: hashPass
        }, {
            new: true
        })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

authRoutes.put('/updateEmail', (req, res, next) => {

    const {
        newEmail,
        oldEmail
    } = req.body

    if (!oldEmail) {
        res.json({
            message: 'Porfavor introduzca el correo electrónico actual',
            status: 'fail'
        })
        return
    }

    if (oldEmail != req.user.email) {
        res.json({
            message: 'El correo electrónico introducido no coincide con el actual.',
            status: 'fail'
        })
        return
    }

    if (newEmail === req.user.email) {
        res.json({
            message: 'Ya estás usando esta dirección de correo',
            status: 'fail'
        })
        return
    }

    if (!newEmail) {
        res.json({
            message: 'Porfavor, introduzca correo electrónico.',
            status: 'fail'
        })
        return
    }

    if (!newEmail.match(/^\S+@\S+\.\S+$/)) {
        res.json({
            message: 'Introduce una dirección de correo válida',
            status: 'fail'
        })
        return
    }

    changeEmail(req.user.username, req.user.email, newEmail)

    User.findByIdAndUpdate(req.user._id, {
            email: newEmail
        }, {
            new: true
        })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})




module.exports = authRoutes