const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    city: { type: String, required: true },
    flag: { type: String, default: "https://petshelter.miwuki.com/img/b/es.svg", required: true },
    specie: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    urgency: { type: String, enum: ["En Adopción", "Urgente"] },
    personality: [String],
    born: Date,
    gender: String,
    size: String,
    weigth: String,
    activity: String,
    vaccinated: { type: String, enum: ["Sí", "No"] },
    dewormed: { type: String, enum: ["Sí", "No"] },
    healthy: { type: String, enum: ["Sí", "No"] },
    sterilized: { type: String, enum: ["Sí", "No"] },
    identified: { type: String, enum: ["Sí", "No"] },
    microchip: { type: String, enum: ["Sí", "No"] },
    comment: String,
    calendar: [{ type: Schema.Types.ObjectId, ref: "Calendar" }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Pet', petSchema)