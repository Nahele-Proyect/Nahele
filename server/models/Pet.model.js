const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    city: { type: String, required: true },
    owner: Schema.Types.ObjectId,
    urgency: { enum: ["En Adopción", "Urgente"] },
    personality: [String],
    born: String,
    gender: String,
    size: String,
    weigth: String,
    activity: String,
    vaccinated: { enum: ["Sí", "No"] },
    dewormed: { enum: ["Sí", "No"] },
    healthy: { enum: ["Sí", "No"] },
    sterilized: { enum: ["Sí", "No"] },
    identified: { enum: ["Sí", "No"] },
    microchip: { enum: ["Sí", "No"] }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pet', petSchema)