const User = require('../models/User')

module.exports = (request, response, next) => {
  const { id } = request.params
  User.findByIdAndRemove(id)
    .then(result => {
      response.status(204).json(result)
    }).catch(error => next(error))
}
