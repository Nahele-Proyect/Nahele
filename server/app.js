require('dotenv').config()
require('./configs/mongoose.config')

const express = require('express')
const app = express()

require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/files', require('./routes/files.routes.js'))


module.exports = app