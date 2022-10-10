const User = require('../models/User')
// library for encript password
const bcrypt = require('bcrypt')

module.exports = async (request, response) => {
  const { body } = request
  if (!body) {
    response.status(400).json({
      error: 'user.email is missing.'
    })
  }
  const { email, password, firstName, lastName, status = false } = body
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    email,
    password: passwordHash,
    firstName,
    lastName,
    creationDate: new Date().toISOString(),
    status
  })

  newUser.save()
    .then(saveUser => {
      response.status(201).json(saveUser)
    }).catch(err => {
      console.error(err.message)
      response.status(400).json(err.message)
    })
}
