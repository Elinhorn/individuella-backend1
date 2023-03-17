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




/* //---denna ska in i / routen sen----
//behövs validering? 
server.post('/todo', (req, res) => {
    
})

//Kan denna bli bättre? kan man göra validering här? 
server.delete('/todo', (req, res) => {
    
})

//funkar okej. Validering?
server.patch('/todo', (req, res) => {

}) */

//behövs denna?
server.get('/todo', (req, res) =>{

})

server.listen(1010)

