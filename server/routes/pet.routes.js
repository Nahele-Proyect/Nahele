//Express imports
const express = require('express')
const router = express.Router()
//Models imports
const Pet = require('../models/Pet.model')
const User = require('../models/User.model')

router.post('/new', (req, res) => {     //Create a pet in the DB
    if (!req.body.name) {  //Pet name validation
        res.json({ status: 'ko', message: 'La mascota necesita tener un nombre' })
        return
    }
    if (!req.body.img) {    //Pet img validation
        res.json({ status: 'ko', message: 'La mascota necesita tener una imagen' })
        return
    }
    if (!req.body.city) {   //Pet city validation
        res.json({ status: 'ko', message: 'La mascota necesita tener una ciudad' })
        return
    }

    req.body.owner = req.user._id   //user (owner) relation

    //DB adaptacion from data adquisition from data format needed
    req.body.vaccinated = (req.body.vaccinated === 'true' ? 'Sí' : 'No')
    req.body.dewormed = (req.body.dewormed === 'true' ? 'Sí' : 'No')
    req.body.healthy = (req.body.healthy === 'true' ? 'Sí' : 'No')
    req.body.sterilized = (req.body.sterilized === 'true' ? 'Sí' : 'No')
    req.body.identified = (req.body.identified === 'true' ? 'Sí' : 'No')
    req.body.microchip = (req.body.microchip === 'true' ? 'Sí' : 'No')

    req.body.born && (req.body.born = new Date(req.body.born))

    Pet.create(req.body)    //Create a pet
        .then(newPet => newPet._id)
        .then(newPetId => User.findByIdAndUpdate(req.user._id, { $push: { pets: newPetId } }, { new: true }).populate('pets').populate('calendar')) //update the user with the pet, and populate the result
        .then(user => res.json({ status: 'ok', user })) //Send the user info to the front
        .catch(err => console.log(err))
})

router.post('/newScraped', (req, res) => {   //Path to create a pet from the scraping, if the pet was already created, returns the existing one

    Pet.findOne({ link: req.body.link })    //Search for the dog existance in the DB
        .then(foundDog => {
            if (foundDog) {
                res.json({ status: "found", pet: foundDog })    //If the pet already exists return (to the front) the pet
                return
            }
            Pet.create(req.body)    //If the pet doesn't exists create it
                .then(pet => res.json({ status: 'created', pet })) //returns to the front the created dog
                .catch(err => console.log(err))
        })
})

router.get('/find/:id', (req, res) => {  //Find a pet in the DB a dog by the mongo DB

    Pet.findById(req.params.id)
        .then(foundDog => res.json({ status: 'ok', pet: foundDog }))
        .catch(err => console.log(err))
})

router.delete('/delete/:id', (req, res) => {    //Delete a pet in the Db by the mongo _id

    Pet.findByIdAndDelete(req.params.id)
        .then(deletedPet => User.findByIdAndUpdate(req.user._id, { $pull: { pets: deletedPet._id } }).populate('calendar').populate('pets'))
        .then(user => res.json({ status: 'ok', user }))
        .catch(err => console.log(err))
})

router.post('/addRequest/:id', (req, res) => {

    Pet.findByIdAndUpdate(req.params.id, {
        $push: {
            requests: {
                username: req.user.username, email: req.user.email, request: req.body.request
            }
        }
    }).then(pet => User.findById(req.user._id).populate('pets').populate('calendar'))
        .then(user => res.json({ status: 'ok', user }))
        .catch(err => console.log(err))
})

module.exports = router