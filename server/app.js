require('dotenv').config()
require('./configs/mongoose.config')

const express = require('express')
const app = express();

require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/files', require('./routes/files.routes.js'))
app.use('/api/scrap', require('./routes/scrap.routes'))

app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

module.exports = app