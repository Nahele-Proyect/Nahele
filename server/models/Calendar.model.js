//mongoose imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//calendar shchema (events for the user and pets)
const calendarSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    petsUrl: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

module.exports = mongoose.model('Calendar', calendarSchema)