//mongoose imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//user schema
const userSchema = new Schema({
  username: String,
  password: String,
  confirmPassword: String,
  email: String,
  img: String,
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  calendar: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)