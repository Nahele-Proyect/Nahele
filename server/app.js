//dotenv config
require('dotenv').config()
//mongooseconfig
require('./configs/mongoose.config')
//Express imports
const express = require('express')
const app = express();

//Middleware imports
require('./configs/protocolRedirection.config')(app)// http to https redirection
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

//Base URLs
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/files', require('./routes/files.routes'))
app.use('/api/scrap', require('./routes/scrap.routes'))
app.use('/api/pet', require('./routes/pet.routes'))
app.use('/api/calendar', require('./routes/calendar.routes'))

app.use((req, res) => res.sendFile(__dirname + '/public/index.html'))

module.exports = app