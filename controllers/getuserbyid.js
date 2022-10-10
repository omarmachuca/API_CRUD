const User = require('../models/User')

module.exports = (request, response, next) => {
  const id = request.params.id
  User.findById(id)
    .then(user => {
      if (user) return response.json(user)
      response.status(204).end()
    }).catch(err => { next(err) })
}
