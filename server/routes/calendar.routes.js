const express = require('express')
const router = express.Router()

const Calendar = require('../models/Calendar.model')
const Pet = require('../models/Pet.model')
const User = require('../models/User.model')

router.post('/new/:id', (req, res) => {
    const user = req.user._id
    console.log(req.params.id)
    const urlPet = req.params.id
    const {
        title,
        start,
        end
    } = req.body

    Calendar.create({
            title,
            start,
            end,
            user: user,
            petsUrl: urlPet
        })
        .then(theCalendar => {
            User.findByIdAndUpdate(req.user._id, {
                    $addToSet: {
                        calendar: theCalendar._id
                    }
                }, {
                    new: true
                })
                .populate('calendar')
                .then(theUser => res.json({
                    theCalendar,
                    theUser
                }))
                .catch(err => console.log('probema asociando ids', err))

        })
        .catch(err => console.log('error en calendario 1', err))

})
module.exports = router