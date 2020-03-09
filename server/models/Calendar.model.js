const mongoose = require('mongoose')
const Schema = mongoose.Schema

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