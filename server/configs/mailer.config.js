const nodemailer = require('nodemailer')
const hbs = require('hbs')
const fs = require('fs')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAILPASS}`
    }
})

const welcomeTemplate = hbs.compile(fs.readFileSync((__dirname, './views/welcomeMail.hbs'), 'utf8'))

exports.welcomeMail = (username, email, password) => {

    transporter.sendMail({
        from: "Fluffy's Shelter",
        to: email,
        subject: '¡Bienvenido a Nahere!',
        html: welcomeTemplate({
            username,
            password
        })
    }).then(info => {
        console.log(info)
    }).catch(error => {
        console.log(error)
        throw error
    })
}

const changeEmail = hbs.compile(fs.readFileSync((__dirname, './views/changeEmail.hbs'), 'utf8'))

exports.newEmail = (username, oldEmail, newEmail) => {

    transporter.sendMail({
        from: "Fluffy's Shelter",
        to: [oldEmail, newEmail],
        subject: 'Detectado cambio de email',
        html: changeEmail({
            username,
            oldEmail,
            newEmail
        })
    }).then(info => {
        console.log(info)
    }).catch(error => {
        console.log(error)
        throw error
    })
}