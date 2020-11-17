module.exports = app => {
    app.enable('trust proxy') // Needed in heroku
    app.use((req, res, next) => {
        if (process.env.ENV === 'DEV') next()
        else if (req.secure) next()
        else res.redirect('https://' + req.headers.host + req.url)
    })
}