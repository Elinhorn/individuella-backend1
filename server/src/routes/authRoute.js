//login och register vara
const express = require('express')
const authRoute = express.Router()
const { register } = require('../controllers/authControllers/register')
const { login } = require('../controllers/authControllers/login')


authRoute.post('/register', register)
authRoute.post('/login', login)

exports.authRoute = authRoute