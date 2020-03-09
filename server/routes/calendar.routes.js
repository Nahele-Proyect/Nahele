const express = require('express')
const router = express.Router()

const Calendar = require('../models/Calendar.model')
const User = require('../models/User.model')

router.post('/new/:id', (req, res) => {
    const user = req.user._id

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

router.delete('/delete/:ID', (req, res) => {

    Calendar.findByIdAndDelete(req.params.ID)
        .then(deletedCalendar => deletedCalendar._id)
        .then(calendarId => User.findByIdAndUpdate(req.user._id, {
            $pull: {
                calendar: calendarId
            }
        }, {
            new: true
        }).populate('calendar'))
        .then(user =>
            res.json({
                status: 'ok',
                user
            }))
        .catch(err => console.log(`Errorsito por aqui papa ${err}`))
})

module.exports = router