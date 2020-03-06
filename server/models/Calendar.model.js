const mongoose = require('mongoose')
const Schema = mongoose.Schema

const calendarSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    dog: {
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Calendar', calendarSchema)