const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
const { model, Schema } = mongoose

/* Setting Schema for User */
const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  firstName: String,
  lastName: String,
  creationDate: Date,
  status: Boolean
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})
/* Apply the validator to the Schema */
userSchema.plugin(uniqueValidator)

/* Create model User with the Schema */
const User = model('User', userSchema)

/* Export module USer */
module.exports = User
