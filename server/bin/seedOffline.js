require('dotenv').config()
const mongoose = require('mongoose')
const Pets = require('../models/Pet.model')
const pets = require('./dogsBackup.json')

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

Pets.create(pets)
    .then(created => console.log(created.name))
    .then(() => mongoose.connections.close())
    .catch(err => err)
