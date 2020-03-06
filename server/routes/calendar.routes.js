const express = require('express')
const router = express.router()

const Calendar = require('../models/Calendar.model')
const Pet = require('../models/Pet.model')
const User = require('../models/User.model')

router.post('/new/:id', (req, res) => {
    const user = req.user
    const pet = req.params.id
    const {
        title,
        start,
        end
    } = req.body

    Calendar.create({
            title,
            start,
            end,
            pet: pet,
            user: user
        })
        .then(theCalendar => {

            Pet.findByIdAndUpdate(
                    pet, {
                        $addToSet: {
                            calendar: theCalendar._id
                        }
                    }, {
                        new: true
                    }
                )
                .then(thePet => {
                    User.findByIdAndUpdate(req.user._id, {
                            $addToSet: {

                                calendar: theCalendar._id
                            }
                        }, {
                            new: true
                        })
                        .then(theUser => res.json({
                            theCalendar,
                            thePet,
                            theUser
                        }))
                        .catch(err => console.log('Error con el calendario 1', err))
                })
        })
        .catch(err => console.log('error en calendario 2', err))
})
module.exports = router