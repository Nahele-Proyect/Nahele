const express = require('express')
const router = express.Router()

const Pet = require('../models/Pet.model')
const User = require('../models/User.model')

router.post('/new', (req, res) => {
    if (!req.body.name) {
        res.json({ status: 'ko', message: 'La mascota necesita tener un nombre' })
        return
    }
    if (!req.body.img) {
        res.json({ status: 'ko', message: 'La mascota necesita tener una imagen' })
        return
    }
    if (!req.body.city) {
        res.json({ status: 'ko', message: 'La mascota necesita tener una ciudad' })
        return
    }

    req.body.owner = req.user._id

    req.body.vaccinated = (req.body.vaccinated === 'true' ? 'Sí' : 'No')
    req.body.dewormed = (req.body.dewormed === 'true' ? 'Sí' : 'No')
    req.body.healthy = (req.body.healthy === 'true' ? 'Sí' : 'No')
    req.body.sterilized = (req.body.sterilized === 'true' ? 'Sí' : 'No')
    req.body.indentified = (req.body.identified === 'true' ? 'Sí' : 'No')
    req.body.microchip = (req.body.microchip === 'true' ? 'Sí' : 'No')

    req.body.born && (req.body.born = new Date(req.body.born))

    Pet.create(req.body)
        .then(newPet => newPet._id)
        .then(newPetId => User.findByIdAndUpdate(req.user._id, { $push: { pets: newPetId } }, { new: true }).populate('pets'))
        .then(user => res.json({ status: 'ok', user }))
        .catch(err => console.log(err))
})

router.post('newScraped', (req, res) => {

    Pet.findOne({ link: req.body.link })
        .then(foundDog => {
            if (foundDog) {
                res.json({ status: "found", foundDog })
                return
            }
            Pet.create(req.body)
                .then(pet => res.json({ status: 'created', pet }))
                .catch(err => console.log(err))
        })
})

router.get('/find/:id', (req, res) => {

    Pet.findById(req.params.id)
        .then(foundDog => res.json({ status: 'ok', pet: foundDog }))
        .catch(err => console.log(err))
})

module.exports = router