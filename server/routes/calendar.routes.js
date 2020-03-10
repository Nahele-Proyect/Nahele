//Express imports
const express = require('express')
const router = express.Router()
//Models imports
const Calendar = require('../models/Calendar.model')
const User = require('../models/User.model')

router.post('/new/:id', (req, res) => { //Create a new calendar event
    const user = req.user._id

    const urlPet = req.params.id
    const {
        title,
        start,
        end
    } = req.body

    Calendar.create({   //Create calendar event
        title,
        start,
        end,
        user: user,
        petsUrl: urlPet
    })
        .then(theCalendar => {  //Link with user calendar events
            User.findByIdAndUpdate(req.user._id, {
                $addToSet: {
                    calendar: theCalendar._id
                }
            }, {
                new: true
            })
                .populate('calendar')   //Populate all user fields
                .populate('pets')
                .then(theUser => res.json({ //Send completed user to refresh user in front
                    theCalendar,
                    theUser
                }))
                .catch(err => console.log('probema asociando ids', err))

        })
        .catch(err => console.log('error en calendario 1', err))

})

router.delete('/delete/:ID', (req, res) => {    //Delete an event from the calendar

    Calendar.findByIdAndDelete(req.params.ID)   //Deletes from the calendar collection
        .then(deletedCalendar => deletedCalendar._id)
        .then(calendarId => User.findByIdAndUpdate(req.user._id, {  //Delete from the user field calendar
            $pull: {
                calendar: calendarId
            }
        }, {
            new: true
        }).populate('calendar').populate('pets'))   //Populate both fields to have all the current field populated
        .then(user =>   //Sends the user current info to the front
            res.json({
                status: 'ok',
                user
            }))
        .catch(err => console.log(`Errorsito por aqui papa ${err}`))
})

module.exports = router