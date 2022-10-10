/* This library is used to call envoirement vars */
require('dotenv').config()

/*  This file constains the connection to mongodb on the cloud */
require('./mongo/mongo')

/* This is a framework to work with nodeJS */
const express = require('express')
const app = express()
app.use(express.json())

/* This Library allow connect external users to the API */
const cors = require('cors')
app.use(cors())

/* This const contains the Schema for DataBase with mongo */
const User = require('./models/User')

/* Library to manage user sessions by token */
const jwt = require('jsonwebtoken')

/* This Consts import middleswares in Path ./middleware */
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

/* import router for Users */
const login = require('./controllers/login')
const newUser = require('./controllers/newuser')
const updateUser = require('./controllers/updateuser')
const deleteUser = require('./controllers/deleteuser')
const getUserById = require('./controllers/getuserbyid')
const getAllUsers = require('./controllers/getallusers')

/* This GET method recieved a resquest in main page */
app.get('/', (request, response) => {
  response.status(200).send('<h1>Users Micro Agritech</h1>')
})

/* This is a POST method to Login a user. */
app.post('/api/login', login)
/* This is a GET method to get all users in the DataBase. */
app.get('/api/users/', getAllUsers)
/* This is a GET method to get a user in the DataBase by ID. */
app.get('/api/users/:id', getUserById)
/* This is a POST method to Create a new User. */
app.post('/api/users/', newUser)
/* This is a PUT method to update a user in the DataBase by ID. */
app.put('/api/users/:id', updateUser)
/* This is a DELETE method to delete a user in the DataBase by ID. */
app.delete('/api/users/:id', deleteUser)

/* This is a Middleware to manage the Errors */
app.use(handleErrors)
/*  This is a Middleware to manage 404 Errors */
app.use(notFound)

/* start Server */
const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server Running un puert ${PORT}`)
})

/* Export app for testing */
module.exports = { app, server }
