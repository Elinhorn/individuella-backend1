const express = require('express')
const server = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { authRoute } = require('./routes/authRoute')
const { userRoute } = require('./routes/userRoute')
require('dotenv').config()



server.use(express.json())
server.use(cookieParser())
server.use(cors())

server.use('/auth', authRoute)
server.use('/user', userRoute)



server.listen(1010)