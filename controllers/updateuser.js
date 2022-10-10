const User = require('../models/User')

module.exports = (request, response, next) => {
  const { id } = request.params
  const user = request.body
  const userUpdate = {
    password: user.password !== '' ? user.password : '',
    firstName: user.firstName !== '' ? user.firstName : '',
    lastName: user.lastName !== '' ? user.lastName : '',
    status: user.status !== '' ? user.status : ''
  }
  User.findByIdAndUpdate(id, userUpdate, { new: true })
    .then(result => {
      response.json(result)
    }).catch(error => next(error))
}
