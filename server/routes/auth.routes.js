//Express imports
const express = require('express')
const authRoutes = express.Router()
//Mailer imports
const sendMail = require('../configs/mailer.config').welcomeMail
const changeEmail = require('../configs/mailer.config').newEmail
//Validation imoports
const passport = require('passport')
const bcrypt = require('bcryptjs')
//Models imports
const User = require('../models/User.model')

authRoutes.post('/signup', (req, res, next) => {

    const {
        username,
        password,
        confirmPassword,
        email
    } = req.body

    if (!username) { //username fild validation
        res.json({
            message: 'Por favor, introduzca nombre de usuario.',
            status: 'fail'
        })
        return
    }

    if (!password) { //password field validation
        res.json({
            message: 'Por favor, introduzca contraseña.',
            status: 'fail'
        })
        return
    }

    if (password != confirmPassword) { //pasword second validation
        res.json({
            message: 'Las contraseñas no coinciden.',
            status: 'fail'
        })
    }

    if (!email) { //email validation
        res.json({
            message: 'Por favor, introduzca correo electrónico.',
            status: 'fail'
        })
        return
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) { //email match validation
        res.json({
            message: 'Introduce una dirección de correo válida',
            status: 'fail'
        })
        return
    }

    if (password.length < 6) { //password length validation
        res.json({
            message: 'La contraseña debe tener al menos 8 carácteres.',
            status: 'fail'
        })
        return
    }

    if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) { //pasword match validation
        res.json({
            message: 'La contraseña debe tener al menos una mayúscula y un número.',
            status: 'fail'
        })
        return
    }

    User.findOne({ //User no repeat validation
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

        //hashPass creation
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
            username,
            password: hashPass,
            email
        })

        aNewUser.save(err => { //User creation

            if (err) {
                res.status(400).json({
                    message: 'Guardar el usuario en la base de datos salio mal.'
                })
                return
            }

            sendMail(username, email, password) //welcome email

            req.login(aNewUser, (err) => { //direct login after signup

                if (err) {
                    res.status(500).json({
                        message: 'El log in tras el sign up salió mal'
                    })
                    return
                }

                res.json(aNewUser) //send user info to the front
            })
        })
    })
})

authRoutes.post('/login', (req, res, next) => { //login route

    const {
        username,
        password
    } = req.body

    if (!username) {
        res.json({
            message: 'Por favor, introduce nombre de usuario.',
            status: 'fail'
        })
        return
    }

    if (!password) {
        res.json({
            message: 'Por favor, introduce la contraseña.',
            status: 'fail'
        })
        return
    }



    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.json({
                message: 'Algo ha ido mal, por favor, inténtelo de nuevo.',
                status: 'fail'
            })
            return
        }

        if (!theUser) {
            res.json({
                message: failureDetails.message,
                status: 'fail'
            })
            return
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'El salvado de la sesión ha ido mal.'
                })
                return
            }

            res.json(theUser)
        })
    })(req, res, next)
})

authRoutes.post('/logout', (req, res, next) => {

    req.logout()
    res.json({
        message: 'Sesión cerrada.'
    })
})

authRoutes.get('/loggedin', (req, res, next) => {

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
            message: 'Por favor, introduzca nombre de usuario.',
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
        .catch(err => next(new Error(err)))
})

authRoutes.put('/updatePassword', (req, res, next) => {

    const {
        password,
        confirmPassword
    } = req.body

    if (!password) {
        res.json({
            message: 'Por favor, introduzca contraseña.',
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
        .catch(err => next(new Error(err)))
})

authRoutes.put('/updateEmail', (req, res, next) => {

    const {
        newEmail,
        oldEmail
    } = req.body

    if (!oldEmail) {
        res.json({
            message: 'Por favor introduzca el correo electrónico actual',
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
            message: 'Por favor, introduzca correo electrónico.',
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
        .catch(err => next(new Error(err)))
})

module.exports = authRoutes