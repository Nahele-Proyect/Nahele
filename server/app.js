require('dotenv').config()
require('./configs/mongoose.config')

const express = require('express')
const app = express()

require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)


app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth.routes'))


module.exports = app