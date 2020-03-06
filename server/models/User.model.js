const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  confirmPassword: String,
  email: String,
  img: String,
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  calendar: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }],
  petsUrl: [String]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)