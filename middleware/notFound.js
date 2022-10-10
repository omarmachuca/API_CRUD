module.exports = (request, response) => {
  console.log('Error 404 ' + request.path)
  response.status(404).json({
    error: 'Not FOUND 404'
  })
}
