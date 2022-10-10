const ERROR_HANDLERS = {
  CastError: res => res.status(400).json({ error: 'Bad Request' }),
  ValiditionError: (res, error) => res.status(409).json({ error: error.message }),
  JsonWebTokenError: res => res.status(401).json({ error: 'Invalid Token' }),
  TokenExpirerError: res => res.status(401).json({ error: 'Token Expired' }),
  dafaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.dafaultError
  handler(response, error)
}
