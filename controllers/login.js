const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const loginRouter = async (request, response) => {
  const { body } = request
  console.log(body)
  const { email, password } = body

  const user = await User.findOne({ email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  console.log('Status: ' + passwordCorrect)
  console.log('Status User: ' + user)

  if (user && passwordCorrect) {
    const userForToken = {
      id: user._id,
      email: user.email
    }
    const SECRET_TOKEN = process.env.SECRET_TOKEN
    const token = jwt.sign(userForToken, SECRET_TOKEN)

    response.send({
      email: user.email,
      firstName: user.firstName,
      token
    }).end()
  }
  response.status(401).end()
  // response.json({ error: 'Invalid User or Password' })
}

module.exports = loginRouter
