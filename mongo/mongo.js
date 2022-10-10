const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI

/* Connection with DB */
mongoose.connect(connectionString)
  .then(() => {
    // console.log('Connection Sucessful')
  }).catch(err => {
    console.error('Connection Error ' + err.message)
  })

/* Handle exception for disconnect from DB */
process.on('uncaughtException', () => {
  mongoose.disconnect()
})
