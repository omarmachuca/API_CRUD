const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = (request, response) => {
  /* Get header */
  const authorization = request.get('authorization')
  let token = ''
  /* validate content authorization */
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  /* decode Token to validate */
  let decodeToken = {}
  try {
    decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)
  } catch (e) {
    return response.status(401)
  }
  /* response depend on Token Validation */
  if ((!token || !decodeToken.id)) {
    return response.status(401)
  }
  /* Show all Users in DB */
  User.find({})
    .then(users => {
      response.status(200).json(users)
    }).catch(err => {
      console.error(err)
    })
}
