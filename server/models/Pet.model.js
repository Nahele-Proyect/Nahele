const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    city: { type: String, required: true },
    flag: { type: String, default: "https://petshelter.miwuki.com/img/b/es.svg" },
    specie: String,
    owner: { type: Schema.Types.ObjectId },
    urgency: { type: String, enum: ["En Adopción", "Urgente"] },
    personality: [String],
    born: String,
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
    comment: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Pet', petSchema)