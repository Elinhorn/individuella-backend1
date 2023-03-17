const express = require('express')
const server = express()
const joi = require('joi')
const cookieParser = require('cookie-parser')
const { authRoute } = require('./routes/authRoute')
const { userRoute } = require('./routes/userRoute')
require('dotenv').config()



//middlewares
server.use(express.json())
//server.use(cookieParser)


server.use('/auth', authRoute)
server.use('/user', userRoute)



server.listen(1010)

