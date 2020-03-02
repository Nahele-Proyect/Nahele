const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  confirmPassword: String,
  email: String,
  img: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)